import Link from "next/link";
import { IconGithub } from "./icons";
import {
  UserButton,
  SignedOut,
  SignedIn,
  SignInButton,
  auth,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { getUserChats } from "@/app/actions";

export default async function Navbar() {
  const { userId } = auth();
  const chats = await getUserChats(userId!);
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
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/" />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
