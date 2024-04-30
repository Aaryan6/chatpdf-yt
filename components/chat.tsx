"use client";
import * as React from "react";
import { Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingCircle from "./loading";

type Props = {
  initialMessages: any;
  chat_id: string;
  document_id: string;
  document_name: string;
  className?: string;
};

export default function Chat({
  initialMessages,
  chat_id,
  document_id,
  document_name,
  className,
}: Props) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      body: {
        document_id,
        chat_id,
      },
      initialMessages: initialMessages,
    });
  const bottomDiv = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={cn(
        "flex flex-col h-full border px-4 md:rounded-xl",
        className
      )}
    >
      <div className="flex items-center space-x-4 py-4">
        <div className="w-10 h-10 grid place-items-center rounded-full bg-muted border-2 border-muted-foreground/10">
          {document_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium leading-none break-all">
            {document_name}
          </p>
          <p className="text-sm text-emerald-400/80 font-medium mt-1">Online</p>
        </div>
      </div>
      <ScrollArea className="h-full flex-1 w-full pr-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "w-fit max-w-[90%] gap-2 rounded-lg px-3 py-2 text-sm my-4 whitespace-pre-wrap",
              message.role === "user"
                ? "ml-auto bg-accent-foreground text-accent rounded-se-none"
                : "bg-muted text-accent-foreground rounded-ss-none"
            )}
          >
            {message.content}
          </div>
        ))}
        <div className="flex justify-center" ref={bottomDiv} />
        {isLoading && <LoadingCircle />}
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-x-2 py-4"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 focus-visible:border-border focus-visible:ring-transparent text-accent-foreground"
          autoComplete="off"
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          size="icon"
          className={cn(input === "" ? "bg-muted-foreground" : "bg-foreground")}
          disabled={input === "" || isLoading}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
