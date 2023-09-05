import Image from "next/image";
import Link from "next/link";
import { usersTable } from "@/drizzle/schema";
import { ArrowRight } from "lucide-react";

import { getSession } from "@/lib/session";
import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";
import { Heading } from "@/ui/typography";
import { ThemeToggle } from "@/components/theme";

import dashboardScreenDark from "./_assets/dashboard-screen-dark.png";
import dashboardScreenLight from "./_assets/dashboard-screen-light.png";

const Index = async () => {
  const session = await getSession();

  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-6 md:px-8">
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <Button size={null} asChild>
            <Link href="/" className="p-2.5">
              <LogoIcon className="h-6 w-6" />
            </Link>
          </Button>
          <span className="font-headings text-lg font-medium">Captivate</span>
        </div>

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

      <div className="flex justify-center mt-14">
        <div className="rounded-full px-4 py-2 border bg-muted font-medium inline-flex text-sm mx-auto">
          🎉 Version 1 released
        </div>
      </div>

      <Heading
        style={{ textWrap: "balance" } as React.CSSProperties}
        className="text-center text-4xl lg:text-5xl !leading-[1.2] tracking-tighter !mt-4 max-w-3xl md:max-w-xl mx-auto px-6"
      >
        Captivate is a better way to revise at A-level
      </Heading>

      <h3 className="text-muted-foreground text-balance text-center leading-[1.5] max-w-3xl md:max-w-lg text-lg font-medium mx-auto px-6 pt-8">
        Interactive flashcards, notes, daily question practise and testing,
        built by students &mdash; for students.
      </h3>

      <div className="flex justify-center mt-10">
        <Button asChild>
          <Link href={session?.user ? "/dashboard" : "/signup"}>
            {session?.user ? "Your dashboard" : "Get started"}
            <ArrowRight className="group-hover:translate-x-1 transition duration-100" />
          </Link>
        </Button>
      </div>

      <ThemeToggle />

      <div className="relative w-full aspect-[1658/1037] mb-10 overflow-hidden rounded-2xl border mt-10">
        <Image
          src={dashboardScreenLight}
          alt="Screenshot of dashboard"
          fill
          className="dark:hidden"
        />
        <Image
          src={dashboardScreenDark}
          alt="Screenshot of dashboard"
          fill
          className="hidden dark:block"
        />
      </div>
    </main>
  );
};

export default Index;
