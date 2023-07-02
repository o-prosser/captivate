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
      <div className="md:pr-[23.5rem]">
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

        <Subjects />

        <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] lg:grid-cols-[1fr,3fr] gap-6 mt-6">
          <Card.Root>
            <Card.Header>
              <Card.Title>Quick links</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col items-start [&>a]:!mb-1">
              <Button variant="arrow" asChild>
                <Link href="mailto://">
                  School email <ArrowRightIcon />
                </Link>
              </Button>
            </Card.Content>
          </Card.Root>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Dashboard;
