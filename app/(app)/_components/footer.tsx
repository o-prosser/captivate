import Link from "next/link";
import { Atom, FlaskRound, Home, Pi } from "lucide-react";

import { Button } from "@/ui/button";

const Footer = () => {
  return (
    <footer className="flex items-center justify-around pb-4 border-t md:hidden [&>a]:text-xs [&>a]:gap-1 [&>a>svg]:!w-5 [&>a>svg]:!h-5 [&>a]:flex-col [&>a>svg]:!mr-0 [&>a>svg]:!mb-1 [&>a]:!h-auto h-24 w-screen fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-md print:hidden">
      <Button variant="ghost" className="px-2" asChild>
        <Link href="/dashboard">
          <Home />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" className="px-2" asChild>
        <Link href="/subjects/maths">
          <Pi />
          Maths
        </Link>
      </Button>
      <Button variant="ghost" className="px-2" asChild>
        <Link href="/subjects/chemistry">
          <FlaskRound />
          Chemistry
        </Link>
      </Button>
      <Button variant="ghost" className="px-2" asChild>
        <Link href="/subjects/physics">
          <Atom />
          Physics
        </Link>
      </Button>
    </footer>
  );
};

export default Footer;
