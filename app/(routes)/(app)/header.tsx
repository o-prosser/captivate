import Link from "next/link";
import Image from "next/image";

import { Button, LogoIcon } from "@/ui";
import Profile from "./profile";
import { SearchIcon, SettingsIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between mx-6 border-b md:border-none md:absolute right-2 top-6 space-x-1">
      <Button variant="default" size={null} asChild iconOnly>
        <Link href="/dashboard" className="p-2.5 md:hidden">
          <LogoIcon className="h-5 w-5"/>
        </Link>
      </Button>

      <Button variant="ghost" iconOnly className="hidden md:inline-flex">
        <SearchIcon />
      </Button>
      <Button variant="ghost" iconOnly className="hidden md:inline-flex">
        <SettingsIcon />
      </Button>
      <Profile />
    </header>
  );
};

export default Header;
