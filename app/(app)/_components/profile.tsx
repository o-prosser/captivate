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
  user,
  feedback,
}: {
  user: Pick<User, "name" | "email" | "image">;
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
              "mr-6 md:mr-8 rounded-full relative w-10 h-10",
              user.image ? "p-0" : "px-3",
            )}
          >
            {user.image ? (
              <Image
                src={user.image}
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
        <DropdownMenu.Content align="end" className="w-64">
          <DropdownMenu.Label className="flex items-center gap-2">
            <div className="rounded-full relative w-10 h-10 shrink-0 grid bg-muted place-items-center text-muted-foreground">
              {user.image ? (
                <Image
                  src={user?.image}
                  alt="Avatar"
                  fill
                  sizes="40px"
                  className="object-cover rounded-full"
                />
              ) : (
                <UserIcon className="h-5 w-5" />
              )}
            </div>
            <div className="flex flex-col">
              <span>{user.name}</span>
              <span className="font-normal text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenu.Label>
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
