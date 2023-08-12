import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { getSession } from "@/lib/session";
import { Button } from "@/ui/button";
import { Heading } from "@/ui/typography";
import { ThemeToggle } from "@/components/theme";

const Index = async () => {
  const session = await getSession();

  return (
    <main className="min-h-screen w-screen">
      <div className="flex px-6 md:px-8 items-center justify-between mt-6">
        <Button variant="link" asChild size={null}>
          <Link href="/" className="hover:opacity-80 dark:brightness-150">
            <Image
              src="/logo.svg"
              alt="Captivate Logo"
              height={18}
              width={107}
            />
          </Link>
        </Button>

        <div className="flex items-center space-x-2">
          {!session?.user && (
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          )}
          <Button variant="default" asChild>
            <Link href={session?.user ? "/dashboard" : "/signup"}>
              {" "}
              {session?.user ? "Your dashboard" : "Sign up"}
            </Link>
          </Button>
        </div>
      </div>

      <Heading className="text-center text-4xl lg:text-5xl !leading-[1.2] bg-gradient-to-b to-[#1A2242] from-[#1F2C5C] dark:from-[#4065DD] dark:to-primary text-transparent bg-clip-text mt-20 max-w-3xl lg:max-w-4xl mx-auto px-6">
        <Balancer>Captivate is a better way to revise at A-level </Balancer>
      </Heading>

      <Heading
        level={2}
        className="text-muted-foreground font-medium text-center leading-[1.5] mt-4 max-w-3xl lg:max-w-4xl mx-auto px-6"
      >
        <Balancer>
          Interactive flashcards, notes, daily question practise and testing,
          built by students.
        </Balancer>
      </Heading>

      <div className="flex justify-center mt-10">
        <Button
          className="group bg-gradient-to-r from-primary to-[#2F4DB1]"
          size="lg"
          asChild
        >
          <Link href={session?.user ? "/dashboard" : "/signup"}>
            {session?.user ? "Your dashboard" : "Get started"}
            <ArrowRight className="!mr-0 !h-5 !w-5 ml-2 group-hover:translate-x-1 transition duration-100" />
          </Link>
        </Button>
      </div>

      <ThemeToggle />
    </main>
  );
};

export default Index;
