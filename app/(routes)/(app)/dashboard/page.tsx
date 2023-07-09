import { Button, Card, Heading, Text } from "@/ui";
import { getCurrentUser } from "@/util/session";
import { format } from "date-fns";
import weeks from "@/data/weeks.json";
import Link from "next/link";
import Sidebar from "./sidebar";
import quotes from "@/data/quotes.json";
import WrapBalancer from "react-wrap-balancer";
import Subjects from "./subjects";
import { ArrowRightIcon } from "lucide-react";

const quickLinks = [
  {
    name: "General",
    links: [
      {
        title: "School email",
        href: "http://mail.stteilos.com/owa",
        category: "",
      },
      {
        title: "Hwb",
        href: "https://hwb.gov.wales",
        category: "",
      },
      {
        title: "St Teilo's",
        href: "https://stteilos.com",
        category: "",
      },
    ],
  },
  {
    name: "WJEC",
    links: [
      {
        title: "Maths",
        href: "https://www.wjec.co.uk/qualifications/mathematics-a-as-level",
      },
      {
        title: "Chemistry",
        href: "https://www.wjec.co.uk/qualifications/chemistry-as-a-level",
      },
      {
        title: "Physics",
        href: "https://www.wjec.co.uk/qualifications/physics-as-a-level",
      },
      {
        title: "Question Bank",
        href: "https://questionbank.wjec.co.uk",
      },
    ],
  },
  {
    name: "Resources",
    links: [
      {
        title: "Physics & Maths Tutor",
        href: "https://pmt.physicsandmathstutor.com",
      },
      {
        title: "Maths DIY",
        href: "https://mathsdiy.com",
      },
      {
        title: "Revise WJEC Maths",
        href: "https://wjecmaths.co.uk",
      },
    ],
  },
];

function getRandom(min: number, max: number) {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}

const Dashboard = async () => {
  const user = await getCurrentUser();

  const quote = quotes[getRandom(0, 1643)];

  return (
    <>
      <div className="md:pr-[23.5rem] w-full">
        <Heading className="mt-12">
          Hello{user?.name ? `, ${user.name}` : ""}!
        </Heading>

        <Text className="mt-4 mb-6 max-w-2xl">
          <WrapBalancer>
            {quote.text.slice(0, -1)}{" "}
            {quote.author ? (
              <span className="font-medium">&mdash; {quote.author}</span>
            ) : (
              ""
            )}
          </WrapBalancer>
        </Text>

        <Sidebar />

        <Subjects />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr,2fr] 2xl:grid-cols-[1fr,3fr] gap-6 mt-6">
          <Card.Root>
            <Card.Header>
              <Card.Title>Quick links</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col items-start [&>a]:!mb-1">
              {quickLinks.map((category, key) => (
                <div key={key} className="mb-3">
                  <Card.Description className="pb-1">
                    {category.name}
                  </Card.Description>

                  <div className="flex flex-col items-start">
                    {category.links.map((link, key) => (
                      <Button
                        variant="arrow"
                        asChild
                        key={key}
                        className="!mb-1"
                      >
                        <Link href={link.href} target="_blank">
                          {link.title} <ArrowRightIcon />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </Card.Content>
          </Card.Root>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
