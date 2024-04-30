"use server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const model = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY!,
  modelName: "embedding-001",
});

export async function retrieveDoc(document_id: string) {
  const vectorStore = new SupabaseVectorStore(model, {
    client: supabase,
    tableName: "chatwithpdf_documents",
    queryName: "chatwithpdf_match_documents",
    filter: (rpc) =>
      rpc.filter("metadata->>document_id", "eq", document_id ?? ""),
  });

  const retriver = vectorStore.asRetriever();
  return retriver;
}
