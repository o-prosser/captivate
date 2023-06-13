import { Button, DropdownMenu } from "@/ui";
import {
  KeyboardIcon,
  LaptopIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
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

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" className="[&>svg]:mr-0 mr-6 md:mr-8 px-3">
            <UserIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-56 mr-4">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item asChild>
              <Link href="/profile">
                <UserIcon />
                <span>Profile</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <SunIcon />
                <span>Theme</span>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>
                    <LaptopIcon />
                    <span>System</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <SunIcon />
                    <span>Light</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <MoonIcon />
                    <span>Dark</span>
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Item asChild>
              <Link href="/profile">
                <SettingsIcon />
                <span>Settings</span>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DropdownMenu.Item asChild>
              <Link href="/profile">
                <KeyboardIcon />
                <span>Keyboard shortcuts</span>
                <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link href="/profile">
                <LifeBuoyIcon />
                <span>Support</span>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <LogOutIcon />
              <span>Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
  );
};

export default Header;
