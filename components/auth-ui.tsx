"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AuthUI() {
  const { supabase } = useSupabase();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-full m-auto py-4 bg-[#030712]">
      <CardHeader>
        <CardTitle>
          <Link href={"/"} className="">
            <h1 className="font-bold text-xl text-center">ChatwithPDF</h1>
          </Link>
        </CardTitle>
        <CardDescription className="text-center">
          Securely sign in to your account to access personalized features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          showLinks={false}
          providers={[]}
          redirectTo={`${getURL()}/auth/callback`}
          magicLink={true}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                fontFamily: poppins.style.fontFamily,
              },
              label: {
                fontFamily: poppins.style.fontFamily,
              },
              input: {
                fontFamily: poppins.style.fontFamily,
              },
              anchor: {
                fontFamily: poppins.style.fontFamily,
              },
            },
            variables: {
              default: {
                colors: {
                  brand: "#122447",
                  brandAccent: "#0f182b",
                  inputBackground: "#1e2336",
                  inputText: "white",
                  inputLabelText: "#f0f0f0",
                  defaultButtonBorder: "#0f182b",
                  inputBorder: "#1e2336",
                  inputBorderHover: "#1e2336",
                  inputBorderFocus: "#1e2336",
                  defaultButtonBackground: "#1e2336",
                  defaultButtonText: "white",
                  dividerBackground: "#1e2336",
                  defaultButtonBackgroundHover: "#0f182b",
                  messageBackgroundDanger: "#1e2336",
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
