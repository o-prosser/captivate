import { OurFileRouter } from "@/app/_lib/uploadthing";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
