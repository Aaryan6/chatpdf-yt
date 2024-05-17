import {
  createMessage,
  createRecord,
  getDocumentUrl,
  storeDocument,
} from "@/app/actions";
import { getSession } from "@/lib/supabase/server";
import { generateEmbeddings } from "@/scripts/embeddings";
import { loadPdf } from "@/scripts/pdf-loader";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const session = await getSession();
    // const user = session?.user;
    const body = await req.formData();
    const document_id = body.get("document_id");
    const document_name = body.get("document_name");
    const userId = body.get("userId");
    const pdf = body.get(document_id as string);

    // loading pdf
    const docs = await loadPdf(pdf as Blob, document_id as string);

    // generating embeddings
    const { success, error } = await generateEmbeddings(docs);

    if (!success || error) {
      return NextResponse.json(
        {
          success: false,
          message: error,
        },
        {
          status: 200,
        }
      );
    }

    const storedFile = await storeDocument(pdf as File, document_id as string);
    const fileUrl = await getDocumentUrl(storedFile!.path);

    // create record
    const chat = await createRecord(
      userId as string,
      fileUrl?.data.publicUrl!,
      document_name as string,
      document_id as string
    );

    if (!chat) {
      return NextResponse.json(
        {
          success: true,
          message: "Something went wrong!",
        },
        {
          status: 400,
        }
      );
    }

    const chat_message = await createMessage(chat[0].id, userId as string);

    return NextResponse.json(
      {
        success: true,
        message: "Document uploaded successfully!",
        data: chat_message,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        body: "Internal Server Error",
        message: error.message ?? "Something went wrong! Try again",
      },
      {
        status: 500,
      }
    );
  }
}
