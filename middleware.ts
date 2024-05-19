import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (res.url.includes("chatwithpdf-y6adj.ondigitalocean.app")) {
    return NextResponse.redirect("https://geminibot-5trwv.ondigitalocean.app/");
  }
  return res;
}
