import { Breadcrumbs, Button, Heading, LogoIcon, Text } from "@/ui";
import { getPractical, getScience } from "@/util/pracitcals";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import labBookCover from "../lab-book-cover.png";
import { DownloadIcon } from "lucide-react";

export const generateMetadata = ({
  params,
}: {
  params: { practical: string; science: string };
}) => {
  const { practical } = getPractical(params.science, params.practical);

  return {
    title: practical?.name,
  };
};

const Practical = ({
  params,
}: {
  params: { practical: string; science: string };
}) => {
  const { science, practical } = getPractical(params.science, params.practical);
  if (!practical) notFound();

  return (
    <>
      <Breadcrumbs
        pages={[science.name, "Practicals", `Unit ${practical.unit}`]}
      />
      <Heading>{practical.name}</Heading>

      <Text className="mt-6 font-semibold">
        Reference:{" "}
        <Button variant="link" size={null} asChild>
          <Link href="#">AS Unit {practical.unit}</Link>
        </Button>
      </Text>

      <div className="flex mt-8 space-x-4">
        <Image
          height={59.5}
          width={84.2}
          src={labBookCover}
          alt="Lab book cover"
        />
        <div>
          <Heading level={4}>Lab book</Heading>
          <Text className="!mt-0 mb-3">
            Pages {practical.bookletPages[0]} &ndash;{" "}
            {practical.bookletPages[1]}
          </Text>

          <Button asChild>
            <Link download href="#">
              <DownloadIcon />
              Download pages
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link download href="#" className="ml-2">
              <DownloadIcon />
              Download booklet
            </Link>
          </Button>
        </div>
      </div>

      <Heading level={2} className="mt-8 mb-2">
        Past paper downloads
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
        {practical.questions.map((question, key) => (
          <Link key={key} href="#" download className="block group">
            <div className="bg-muted w-full aspect-[1/1.42] grid place-items-center group-hover:bg-muted/70">
              <LogoIcon className="text-muted-foreground h-8 w-8" />
            </div>
            <span className="leading-6 font-medium mt-2 block group-hover:text-foreground/70">
              {question.reference}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Practical;
