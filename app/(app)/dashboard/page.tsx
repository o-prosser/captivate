import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WrapBalancer from "react-wrap-balancer";

import quickLinks from "@/data/quick-links.json";
import quotes from "@/data/quotes.json";
import { getValidSession } from "@/util/session";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";

import Sidebar from "./_components/sidebar";
import Subject from "./_components/subjects";

function getRandom(min: number, max: number) {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}

export const metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const { user } = await getValidSession();

  const quote = quotes[getRandom(0, 1643)];

  return (
    <>
      <div className="layout-home grid gap-6 md:grid-cols-2 md:grid-rows-[auto,auto,auto,auto,1fr,auto,auto] lg:grid-cols-[1fr,21.5rem] xl:grid-cols-[1fr,1fr,1fr,21.5rem] xl:grid-rows-[auto,auto,1fr]">
        <div className="area-[heading]">
          <Heading>Hello{user?.name ? `, ${user.name}` : ""}!</Heading>

          <Text className="mt-4 max-w-2xl">
            <WrapBalancer>
              {quote.text.slice(0, -1)}{" "}
              {quote.author ? (
                <span className="font-medium">&mdash; {quote.author}</span>
              ) : (
                ""
              )}
            </WrapBalancer>
          </Text>
        </div>

        <Sidebar />

        <Subject subject="maths" />
        <Subject subject="chemistry" />
        <Subject subject="physics" />

        {/* Stop subjects stretching out */}
        <div className="area-[stretch] hidden md:block xl:hidden" />

        <Card.Root className="area-[links]">
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
                    <Button variant="arrow" asChild key={key} className="!mb-1">
                      <Link href={link.href} target="_blank">
                        {link.title} <ArrowRight />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </Card.Content>
        </Card.Root>
        <Card.Root className="xl:col-span-2 area-[flashcards]">
          <Card.Header>
            <Card.Title>Recent flashcards</Card.Title>
            <Card.Content></Card.Content>
          </Card.Header>
        </Card.Root>
      </div>
    </>
  );
};

export default Dashboard;

export const runtime = "edge";
export const preferredRegion = "lhr1";
