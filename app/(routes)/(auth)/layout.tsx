import Image from "next/image";
import Link from "next/link";

import { Button, Text } from "@/ui";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
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

    <Text className="text-muted-foreground fixed text-center inset-x-0 bottom-6">
      &copy; Prosser Media {new Date().getFullYear()}
    </Text>
  </>
);

export default AuthLayout;
