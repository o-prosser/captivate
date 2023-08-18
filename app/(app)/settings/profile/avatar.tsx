"use client";

import { useState } from "react";
import Image from "next/image";
import type { User as UserType } from "@/drizzle/schema";
import { User } from "lucide-react";

import { UploadButton } from "@/util/uploadthing";
import { buttonVariants } from "@/ui/button";

const Avatar = ({ user }: { user: Pick<UserType, "image"> }) => {
  const [image, setImage] = useState(user.image || "");

  return (
    <div className="flex gap-4 items-center">
      <input type="hidden" name="image" value={image} />

      <div className="h-12 w-12 rounded-full bg-muted text-muted-foreground relative grid place-items-center">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <User className="h-6 w-6" />
        )}
      </div>
      <UploadButton
        content={{
          button: ({ ready }) => (ready ? "Change avatar" : "Loading"),
        }}
        appearance={{
          button: buttonVariants({
            variant: "outline",
            className: "w-auto bg-background text-foreground",
          }),
          allowedContent: "hidden",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          if (!res) return;
          setImage(res[0].fileUrl);
        }}
        onUploadError={(error: Error) => {
          console.error(error);
        }}
      />
    </div>
  );
};

export default Avatar;
