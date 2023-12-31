import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";

import { getPractical } from "@/util/pracitcals";
import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";
import { Heading, Text } from "@/ui/typography";
import { DocumentCover } from "@/components/document-cover";
import { createView } from "@/models/view";

export const generateMetadata = ({
  params,
}: {
  params: { practical: string; subject: string };
}) => {
  const { practical } = getPractical(params.subject, params.practical);

  return {
    title: "Practicals – " + practical?.name,
  };
};

const Practical = async ({
  params,
}: {
  params: { practical: string; subject: string };
}) => {
  const { science: subject, practical } = getPractical(
    params.subject,
    params.practical,
  );
  if (!practical) notFound();

  await createView({
    url: `/subjects/${params.subject}/practicals/${params.practical}`,
  });

  return (
    <>
      <Heading>{practical.name}</Heading>

      <Text className="mt-6 font-semibold">
        Reference:{" "}
        <Button variant="link" size={null} asChild>
          <Link
            href={`/subjects/${params.subject}/notes/${practical.unit}/${
              practical.reference.toString().split(".")[1]
            }`}
          >
            AS Unit {practical.reference}
          </Link>
        </Button>
      </Text>

      <div className="flex mt-8 space-x-4">
        <DocumentCover
          unit="WJEC AS Unit 1/2"
          subject={subject.name}
          title={["Specified practicals", "— student lab book"]}
          className="w-20 h-auto"
        />
        <div>
          <Heading level={4}>Lab book</Heading>
          <Text className="mb-3">
            Pages {practical.bookletPages[0]} &ndash;{" "}
            {practical.bookletPages[1]}
          </Text>

          <Button asChild>
            <Link href={practical.download} target="_blank">
              <Download />
              Download pages
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link download href={subject.labBook} className="ml-2">
              <Download />
              Download booklet
            </Link>
          </Button>
        </div>
      </div>

      {practical.questions.length > 0 && (
        <>
          <Heading level={2} className="mt-8 mb-2">
            Past paper downloads
          </Heading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
            {practical.questions.map(async (question, key) => (
              <Link
                key={key}
                href={question.download}
                target="_blank"
                className="block group"
              >
                <div className="bg-muted w-full aspect-[1/1.42] grid place-items-center group-hover:bg-muted/70 transition duration-100">
                  <LogoIcon className="text-muted-foreground h-8 w-8" />
                </div>
                <span className="leading-6 font-medium mt-2 block group-hover:text-foreground/70 transition duration-100">
                  {question.reference}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Practical;
