"use client";

import React, { use, useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "./icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingCircle from "./loading";
import { useStore } from "@/lib/zustand";

export function Dropbox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const item = useStore((state) => state);

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length > 1) {
      toast.error("Only one file is allowed");
      return;
    }
    if (acceptedFiles[0].type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (acceptedFiles[0].size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }
    setFile(acceptedFiles[0]);
    onSubmit(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (pdf_file: File) => {
    const userId = localStorage.getItem("chatpgm_id");
    if (!userId) {
      toast.error("User not found");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (!pdf_file) {
        toast.error("Please select a file");
        return;
      }
      const date = Date.now().toString();
      const document_id =
        pdf_file.name.replace(" ", "-").substring(0, 10) + "-" + date;
      formData.append(document_id, pdf_file);
      formData.append("document_name", pdf_file.name);
      formData.append("document_id", document_id);
      formData.append("userId", userId);

      const response = await fetch("/api/store-pdf", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (response.success && response.data) {
        toast.success(response.message);
        item.onDialogClose();
        router.push(`/chat/${response.data[0].id}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Try again");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div
      {...getRootProps()}
      className="border border-slate-400 text-center w-full max-w-md mx-auto rounded-2xl h-44 mt-8 grid place-items-center px-16 text-slate-400"
    >
      <input {...getInputProps()} accept=".pdf" />
      {isDragActive ? (
        <div className="">
          <p>Drop the files here ...</p>
        </div>
      ) : !!file ? (
        <div className="space-y-3">
          {loading && <LoadingCircle />}
          <p>{file.name}</p>
          <p>{(file.size / (1024 * 1024)).toFixed(2)}MB</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p>Drag & drop some files here, or click to select files</p>
          <IconUpload className="fill-slate-400 mx-auto w-6 h-6" />
        </div>
      )}
    </div>
  );
}
