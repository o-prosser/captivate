import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { getValidSession } from "@/util/session";
import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";

import AddEvent from "./add-event";
import Feedback from "./feedback";

const Profile = dynamic(() => import("./profile"));
const CommandBar = dynamic(() => import("./command"));
const Navigation = dynamic(() => import("./navigation"));
const Add = dynamic(() => import("./add"));

const Header = async () => {
  const { user } = await getValidSession();

  return (
    <>
      <header className="flex items-center justify-between border-b md:border-none fixed inset-x-0 top-0 md:static bg-background/80 backdrop-blur-md space-x-1 px-6 md:px-0 md:-ml-5 h-16 md:h-auto z-10 print:hidden md:pb-4">
        <Button variant="default" size={null} asChild>
          <Link href="/dashboard" className="p-2.5 md:hidden">
            <LogoIcon className="h-5 w-5" />
          </Link>
        </Button>

        <Navigation />
        <CommandBar />
        <Add eventDialog={<AddEvent userId={user.id} />} user={user} />
        <Profile feedback={<Feedback />} image={user.image} />
      </header>

      <header className="hidden absolute print:block left-8 top-6">
        <Image src="/logo.svg" alt="Captivate Logo" height={27} width={160} />
      </header>
    </>
  );
};

export default Header;
