"use client";
import { ChatSidebar } from "@/app/chat/[id]/_components/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useStore } from "@/lib/zustand";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const item = useStore((state) => state);
  const path = usePathname();
  if (!path.includes("/chat")) return null;
  return (
    <Sheet open={item.IsSidebarOpen} onOpenChange={item.onSidebarClose}>
      <Button
        variant="outline"
        onClick={item.onSidebarOpen}
        className="flex md:hidden"
      >
        <Menu />
      </Button>
      <SheetContent className="z-[9999] h-full flex flex-col p-4 pt-10">
        <ChatSidebar className="border-transparent" />
      </SheetContent>
    </Sheet>
  );
}
