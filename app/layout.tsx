import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import SupabaseProvider from "@/lib/supabase/supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with PDF",
  description:
    "Chat with PDF is a tool website that let you to chat with your pdf. All your chats and pdfs will be stored so you can jump back when you want. This is made by Aaryan Patel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SupabaseProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="h-full flex flex-col w-full bg-background">
              <Navbar />
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </body>
      </SupabaseProvider>
    </html>
  );
}
