import { getChats, getRecord } from "@/app/actions";
import Chat from "@/components/chat";
import { Chat as ChatTypes, Record } from "@/utils/types";

type Props = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params: { id } }: Props) {
  const chats: ChatTypes = await getChats(id);
  const record: Record = await getRecord(chats.record_id);
  return (
    <div className="h-[calc(100vh-5rem)] pt-20 flex">
      <Chat
        initialMessages={chats.messages}
        chat_id={id}
        document_id={record.document_id}
        document_name={record.document_name}
      />
    </div>
  );
}
