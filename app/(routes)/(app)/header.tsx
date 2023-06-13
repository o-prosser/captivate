import Link from "next/link";
import Image from "next/image";

import { Button } from "@/ui";
import Profile from "./profile";

const Header = () => {
  return (
    <header className="flex items-center justify-between md:justify-end border-b">
      <Button variant="link" asChild>
        <Link href="/dashboard" className="ml-6 inline-flex md:hidden">
          <Image
            src="/logo.svg"
            alt="Captivate Logo"
            height={24}
            width={138.86}
          />
        </Link>
      </Button>

      <Profile />
    </header>
  );
};

export default Header;
