import Link from "next/link";
import { IconGithub } from "./icons";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { getUserChats } from "@/app/actions";
import { getSession } from "@/lib/supabase/server";
import UserAvatar from "./avatar";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;
  const chats = await getUserChats(user?.id as string);
  return (
    <div className={cn("w-full z-[999] px-4 md:px-8")}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <div className="">
          <Link href={"/"} className="">
            <h1 className="font-bold text-xl">ChatwithPDF</h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-4 md:gap-x-6">
          {chats!.length > 0 && (
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
          {user ? (
            <UserAvatar user={user} />
          ) : (
            <Link href={"/signin"}>Login</Link>
          )}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
