"use client";
import { getChats, getRecord } from "@/app/actions";
import Chat from "@/components/chat";
import { Chat as ChatTypes, Record } from "@/utils/types";
import { redirect } from "next/navigation";
import PDFViewer from "./_components/pdf-viewer";
import { ChatSidebar } from "./_components/sidebar";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/loading";

type Props = {
  params: {
    id: string;
  };
};

export default function ChatPage({ params: { id } }: Props) {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("chatpgm_id") : null;
  const [chats, setChats] = useState<ChatTypes | null>(null);
  const [record, setRecord] = useState<Record | null>(null);
  useEffect(() => {
    getData();
  }, [userId]);

  const getData = async () => {
    const chats: ChatTypes = await getChats(id, userId!);
    if (!chats) redirect("/");
    setChats(chats);
    const record: Record = await getRecord(chats.record_id);
    if (!record) redirect("/");
    setRecord(record);
  };

  if (!chats || !record)
    return (
      <div className="h-screen grid place-items-center">
        <LoadingCircle />
      </div>
    );
  return (
    <div className="h-[calc(100vh-5rem)] flex gap-x-4 md:p-4 pt-0">
      <ChatSidebar className="p-4 w-1/3 hidden md:block" />
      <Chat
        className="w-full md:w-2/3 lg:w-1/2"
        initialMessages={chats.messages}
        chat_id={id}
        document_id={record.document_id}
        document_name={record.document_name}
      />
      <PDFViewer className="hidden lg:block" url={record.document_url} />
    </div>
  );
}
