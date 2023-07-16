"use client";

import Image from "next/image";
import Link from "next/link";
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
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";
import * as DropdownMenu from "@/ui/dropdown-menu";

const Profile = ({
  setCommandOpen,
  image,
}: {
  setCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image?: string | null;
}) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          className={cn(
            "[&>svg]:mr-0 mr-6 md:mr-8 rounded-full",
            image ? "p-0 relative w-10 h-10" : "px-3"
          )}
        >
          {image ? (
            <Image
              src={image}
              alt="Avatar"
              fill
              sizes="40px"
              className="object-cover rounded-full"
            />
          ) : (
            <UserIcon />
          )}
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
                <DropdownMenu.Item onSelect={() => setTheme("system")}>
                  <LaptopIcon />
                  <span>System</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => setTheme("light")}>
                  <SunIcon />
                  <span>Light</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => setTheme("dark")}>
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
          <DropdownMenu.Item onSelect={() => setCommandOpen(true)}>
            <KeyboardIcon />
            <span>Keyboard shortcuts</span>
            <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
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
          <DropdownMenu.Item onSelect={() => signOut()}>
            <LogOutIcon />
            <span>Logout</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Profile;
