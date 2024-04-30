import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function loadPdf(file: Blob, document_id: string) {
  const loader = new WebPDFLoader(file);
  const docs = await loader.load();

  const docSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
  });

  const splitDocs = await docSplitter.splitDocuments(docs);

  const formattedDoc = splitDocs.map((doc) => {
    return {
      pageContent: doc.pageContent.replace(/\n/g, ""),
      metadata: {
        source: doc.metadata.source,
        pdf: doc.metadata.pdf,
        loc: doc.metadata.loc,
        document_id: document_id,
      },
    };
  });

  return formattedDoc;
}
