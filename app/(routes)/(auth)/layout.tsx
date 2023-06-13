import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button, Text } from "@/ui";
import { getCurrentUser } from "@/util/session";
import ThemeToggle from "@/components/theme";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <>
      <Button variant="link" asChild size={null}>
        <Link
          href="/"
          className="hover:opacity-80 fixed inset-x-0 sm:right-auto ml-6 top-6 block"
        >
          <Image src="/logo.svg" alt="Captivate Logo" height={28} width={162} />
        </Link>
      </Button>

      <div className="min-h-[calc(100vh-6.75rem)] w-screen grid place-items-center top-14">
        <main className="w-full px-6 sm:px-0 sm:max-w-md text-center">
          {children}
        </main>
      </div>

      <Text className="text-muted-foreground fixed inset-x-6 bottom-6 md:text-center">
        &copy; Prosser Media {new Date().getFullYear()}
      </Text>
      <ThemeToggle />
    </>
  );
};

export default AuthLayout;
