import Link from "next/link";
import { AtomIcon, FlaskRoundIcon, HomeIcon, PiIcon } from "lucide-react";

import { Button } from "@/ui";

const Footer = () => {
  return (
    <footer className="flex items-center justify-around pb-4 border-t md:hidden [&>a]:rounded-full [&>a>svg]:!w-6 [&>a>svg]:!h-6 [&>a]:flex-col [&>a>svg]:!mr-0 [&>a>svg]:!mb-1 [&>a]:!h-auto h-24 w-screen fixed bottom-0 inset-x-0 bg-background print:hidden">
      <Button variant="ghost" asChild>
        <Link href="/dashboard">
          <HomeIcon />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/subjects/maths">
          <PiIcon />
          Maths
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/subjects/chemistry">
          <FlaskRoundIcon />
          Chemistry
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/subjects/physics">
          <AtomIcon />
          Physics
        </Link>
      </Button>
    </footer>
  );
};

export default Footer;
