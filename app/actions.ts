import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs";

export async function storeDocument(pdf: File, document_id: string) {
  try {
    const { data, error } = await supabase.storage
      .from("docs")
      .upload(document_id, pdf);
    console.log(data);
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDocumentUrl(path: string) {
  try {
    const publicUrl = supabase.storage.from("docs").getPublicUrl(path);
    return publicUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function createRecord(
  user_id: string,
  document_url: string,
  document_name: string,
  document_id: string
) {
  try {
    const { data, error } = await supabase
      .from("records")
      .insert([
        {
          user_id,
          document_url,
          document_name,
          document_id,
        },
      ])
      .select();
    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createMessage(record_id: string, user_id: string) {
  try {
    const { data, error } = await supabase
      .from("chats")
      .insert({
        record_id,
        user_id,
        messages: [],
      })
      .select();
    if (error) console.log("create message", error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMessages(chat_id: string, messages: any[]) {
  console.log(messages, chat_id);
  try {
    const { data, error } = await supabase
      .from("chats")
      .update({
        messages,
        updated_at: new Date().toISOString(),
      })
      .eq("id", chat_id);

    if (error) console.log("update message", error);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecord(record_id: string) {
  try {
    const { data, error } = await supabase
      .from("records")
      .select()
      .eq("id", record_id)
      .single();

    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getChats(chat_id: string) {
  const { userId } = auth();
  try {
    const { data, error } = await supabase
      .from("chats")
      .select()
      .eq("id", chat_id)
      .eq("user_id", userId)
      .single();

    if (error) console.log(error);
    return data;
  } catch (error) {
    console.log(error);
  }
}
