"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  url: string;
};

export default function PDFViewer({ url, className }: Props) {
  return (
    <div
      className={cn(
        "h-full w-1/3 max-w-lg rounded-xl overflow-hidden",
        className
      )}
    >
      <iframe src={url} className="w-full h-full" />
    </div>
  );
}
