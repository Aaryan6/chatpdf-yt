import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import * as dotenv from "dotenv";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
dotenv.config();

const model = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY!,
  modelName: "embedding-001",
});

export async function generateEmbeddings(docs: any[]) {
  try {
    const res = await SupabaseVectorStore.fromDocuments(docs, model, {
      client: supabase,
      tableName: "documents",
      queryName: "match_documents",
    });
    return { success: true, res };
  } catch (error) {
    console.log("from embedddings", error);
    return { success: false, error };
  }
}
