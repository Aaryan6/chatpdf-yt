"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserChats } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import { Chat } from "@/utils/types";
import { ArrowRight, Home } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import DropboxDialog from "@/components/dropbox-dialog";
import Link from "next/link";
import LoadingCircle from "@/components/loading";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/zustand";

type Props = {
  className?: string;
};

export function ChatSidebar({ className }: Props) {
  const { user } = useUser();
  const [IsPending, startTransition] = useTransition();
  const [chats, setChats] = useState<Chat[] | null>(null);
  const router = useRouter();
  const sidebar = useStore((state) => state);
  const path = usePathname();

  useEffect(() => {
    startTransition(async () => {
      const data = await getUserChats(user?.id!);
      setChats(data);
    });
  }, [user]);

  return (
    <div className={cn("border rounded-xl", className)}>
      <div className="flex items-center justify-between">
        <Button
          variant={"secondary"}
          onClick={() => {
            sidebar.onSidebarClose();
            router.push("/");
          }}
        >
          <Home size={20} />
        </Button>
        <DropboxDialog />
      </div>
      <div className="space-y-4 py-4">
        <h2 className="p-2 text-lg font-semibold tracking-tight border-b">
          Chats
        </h2>
        <ScrollArea className="h-full overflow-y-auto">
          {IsPending && <LoadingCircle />}
          {chats?.map(
            (chat, index) =>
              chat.messages.length > 0 && (
                <Button
                  key={index}
                  variant={"ghost"}
                  className={cn(
                    "w-full justify-start my-1",
                    path.split("/")[2] === chat.id && "bg-muted"
                  )}
                  onClick={() => {
                    router.push(`/chat/${chat.id}`);
                    sidebar.onSidebarClose();
                  }}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {chat.messages[0].content}
                </Button>
              )
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
