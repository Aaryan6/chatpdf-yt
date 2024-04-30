import { NextRequest } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { retrieveDoc } from "@/scripts/retriever";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { updateMessages } from "@/app/actions";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role === "assistant" && "model"}: ${message.content}`;
};

const ANSWER_TEMPLATE = `
context: {context}
conversation history: {chat_history}
question: {question}
answer: `;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { document_id, chat_id } = body;
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY!,
    modelName: "gemini-pro",
    streaming: true,
  });

  function combineDocuments(docs: any[]) {
    return docs.map((doc) => doc.pageContent).join("\n\n");
  }

  const retriever = await retrieveDoc(document_id);

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.original_input.input,
    retriever,
    combineDocuments,
  ]);

  const outputParser = new BytesOutputParser();

  const answerChain = answerPrompt.pipe(llm).pipe(outputParser);

  const chain = RunnableSequence.from([
    {
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.input,
      chat_history: ({ original_input }) => original_input.chat_history,
    },
    answerChain,
  ]);

  const stream = await chain.stream(
    {
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    },
    {
      callbacks: [
        {
          async handleLLMEnd(output) {
            const update_messages = [
              ...messages,
              {
                role: "model",
                content: output.generations[0][0].text,
              },
            ];
            await updateMessages(chat_id, update_messages);
          },
        },
      ],
    }
  );

  return new StreamingTextResponse(stream);
}
