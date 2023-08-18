"use client";

import Image from "next/image";
import Link from "next/link";
import type { User } from "@/drizzle/schema";
import {
  HelpCircle,
  Laptop,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Moon,
  Settings,
  Sun,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { logout } from "@/actions/session";
import { cn } from "@/util/cn";
import { Button } from "@/ui/button";
import { Root as DialogRoot, Trigger as DialogTrigger } from "@/ui/dialog";
import * as DropdownMenu from "@/ui/dropdown-menu";

const Profile = ({
  image,
  feedback,
}: {
  image?: User["image"];
  feedback: React.ReactNode;
}) => {
  const { setTheme } = useTheme();

  return (
    <DialogRoot>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button
            variant="outline"
            className={cn(
              "[&>svg]:mr-0 mr-6 md:mr-8 rounded-full relative",
              image ? "p-0 relative w-10 h-10" : "px-3",
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
              <Link href="/settings/profile">
                <UserIcon />
                <span>Profile</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <Sun />
                <span>Theme</span>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item onSelect={() => setTheme("system")}>
                    <Laptop />
                    <span>System</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => setTheme("light")}>
                    <Sun />
                    <span>Light</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => setTheme("dark")}>
                    <Moon />
                    <span>Dark</span>
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Item asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DialogTrigger asChild>
              <DropdownMenu.Item>
                <HelpCircle />
                <span>Feedback</span>
              </DropdownMenu.Item>
            </DialogTrigger>
            <DropdownMenu.Item asChild>
              <Link href="/profile">
                <MessageSquare />
                <span>Support</span>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          <DropdownMenu.Group>
            <DropdownMenu.Item onSelect={logout}>
              <LogOut />
              <span>Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {feedback}
    </DialogRoot>
  );
};

export default Profile;
