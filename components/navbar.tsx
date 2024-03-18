"use client";

import Link from "next/link";
import { IconGithub } from "./icons";
import { UserButton, SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[999] px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <div className="">
          <Link href={"/"} className="">
            <h1 className="font-bold text-xl">ChatwithPDF</h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href={"/github.com"} className="">
            <IconGithub className="fill-white w-6 h-6 hover:fill-slate-200" />
          </Link>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
