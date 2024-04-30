import AuthUI from "@/components/auth-ui";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/supabase/server";

const Signin = async () => {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col h-screen justify-between max-w-md p-3 m-auto w-full">
      <AuthUI />
    </div>
  );
};

export default Signin;
