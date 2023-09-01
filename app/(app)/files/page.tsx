import Link from "next/link";

import { Button } from "@/ui/button";
import { Heading } from "@/ui/typography";
import { selectFiles } from "@/models/file";

const FilesPage = async () => {
  const files = await selectFiles();

  return (
    <>
      <Heading>Your files</Heading>
      <Button asChild className="mt-6">
        <Link href="/files/create">Upload file</Link>
      </Button>

      {files.map((file, key) => (
        <div key={key}>
          {file.title} &mdash;
          {file.url}
        </div>
      ))}
    </>
  );
};

export default FilesPage;
export const runtime = "edge";
export const preferredRegion = "lhr1";
