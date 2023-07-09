import { OurFileRouter } from "@/lib/uploadthing";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
