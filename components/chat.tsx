"use client";
import * as React from "react";
import { Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  initialMessages: any;
  chat_id: string;
  document_id: string;
  document_name: string;
};

export default function Chat({
  initialMessages,
  chat_id,
  document_id,
  document_name,
}: Props) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      body: {
        document_id,
        chat_id,
      },
      initialMessages: initialMessages,
    });

  return (
    <div className="flex-1 max-w-xl mx-auto py-4">
      <div className="flex items-center space-x-4">
        <UserButton />
        <div>
          <p className="text-sm font-medium leading-none text-white break-all">
            {document_name}
          </p>
          <p className="text-sm text-emerald-400/80 font-medium mt-1">Online</p>
        </div>
      </div>
      <ScrollArea className="h-full flex-1 w-full flex flex-col pr-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "w-fit max-w-[100%] gap-2 rounded-lg px-3 py-2 text-sm my-2 whitespace-pre-wrap",
              message.role === "user"
                ? "ml-auto bg-slate-200 text-black"
                : "bg-gray-800 text-gray-100"
            )}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-gray-100 rounded-full"></div>
          </div>
        )}
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 bg-gray-900 border-gray-700 focus-visible:border-gray-500 focus-visible:ring-transparent text-gray-100"
          autoComplete="off"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
