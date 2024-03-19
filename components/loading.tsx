"use client";

export default function LoadingCircle() {
  return (
    <div className="flex justify-center">
      <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-foreground rounded-full"></div>
    </div>
  );
}
