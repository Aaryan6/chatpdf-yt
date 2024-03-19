"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dropbox } from "./dropbox";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { useStore } from "@/lib/zustand";

export default function DropboxDialog() {
  const item = useStore((state) => state);
  return (
    <Dialog open={item.IsDialogOpen} onOpenChange={item.onDialogClose}>
      <Button
        variant={"secondary"}
        onClick={() => {
          item.onDialogOpen();
          item.onSidebarClose();
        }}
      >
        New <PlusCircle className="w-4 h-4 ml-1" />
      </Button>
      <DialogContent className="z-[99999]">
        <Dropbox />
      </DialogContent>
    </Dialog>
  );
}
