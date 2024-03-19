import { Dropbox } from "@/components/dropbox";
import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="-mt-[5rem] h-full w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Chat with PDF
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Chat directly with PDF documents, extracting insights and sparking
          ideas previously left undiscovered.
        </p>
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
            <Button variant={"default"} className="mt-6 mx-auto">
              Get Started
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Dropbox />
        </SignedIn>
      </div>
    </div>
  );
}
