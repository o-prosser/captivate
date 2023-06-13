import { Button } from "@/ui";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

      <Button variant="outline" className="[&>svg]:mr-0 mr-6 md:mr-8 px-3">
        <UserIcon />
      </Button>
    </header>
  );
};

export default Header;
