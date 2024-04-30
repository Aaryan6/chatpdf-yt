import { getChats, getRecord } from "@/app/actions";
import Chat from "@/components/chat";
import { Chat as ChatTypes, Record } from "@/utils/types";
import { redirect } from "next/navigation";
import PDFViewer from "./_components/pdf-viewer";
import { ChatSidebar } from "./_components/sidebar";
import { getSession } from "@/lib/supabase/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params: { id } }: Props) {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/");
  const chats: ChatTypes = await getChats(id, user!.id);
  if (!chats) redirect("/");
  const record: Record = await getRecord(chats.record_id);
  if (!record) redirect("/");
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
