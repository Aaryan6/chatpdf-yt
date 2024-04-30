"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function UserAvatar({ user }: any) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
    } else {
      return router.refresh();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:border-none">
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} alt="" />
          <AvatarFallback>
            {user?.email?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Button onClick={handleLogout} className="w-44" variant={"secondary"}>
            Logout
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
