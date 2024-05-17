"use client";
import Link from "next/link";
import { IconGithub } from "./icons";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { getUserChats } from "@/app/actions";
import { useEffect, useState } from "react";

export default function Navbar() {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("chatpgm_id") : null;
  const [chats, setChats] = useState<any>(null);

  function generateId() {
    let result = "";
    let length = 6;
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    let id;
    const u_id = localStorage.getItem("chatpgm_id");
    if (!u_id) {
      id = generateId();
      localStorage.setItem("chatpgm_id", id);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const chats = await getUserChats(userId!);
      setChats(chats);
    })();
  }, [userId]);
  return (
    <div className={cn("w-full z-[999] px-4 md:px-8")}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <div className="">
          <Link href={"/"} className="">
            <h1 className="font-bold text-xl">ChatwithPDF</h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-4 md:gap-x-6">
          {chats?.length > 0 && (
            <Link
              href={`/chat/${chats![0].id}`}
              className="font-medium text-foreground hover:text-muted-foreground duration-100"
            >
              Chats
            </Link>
          )}
          <Link
            href={"https://github.com/Aaryan6/chatpdf-yt"}
            target="_blank"
            className=""
          >
            <IconGithub className="fill-white w-6 h-6 hover:fill-slate-200" />
          </Link>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
