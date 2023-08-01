import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/util/session";
import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";

const WelcomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="bg-background sm:min-h-[100dvh] grid place-items-center px-5">
      <div className="max-w-lg w-full">
        <div className="mb-6">
          <Button variant="default" size={null} asChild className="p-2.5">
            <Link href="/">
              <LogoIcon className="h-6 w-6" />
            </Link>
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
};

export default WelcomeLayout;
