"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, MenuIcon } from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import * as Sheet from "@/ui/sheet";
import { Heading, Text } from "@/ui/typography";

export const SubjectLayout = ({
  title,
  subTitle,
  links,
  children,
}: {
  title: string;
  subTitle: string;
  links: {
    label: string;
    links: {
      Icon: LucideIcon;
      href: string;
      label: string;
      active?: string;
    }[];
  }[];
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative flex primary-${title.toLowerCase()}`}>
      <nav className="fixed h-16 ml-1.5 top-0 left-36 flex items-center z-10 md:hidden print:!hidden">
        <Sheet.Root open={open} onOpenChange={setOpen}>
          <Sheet.Trigger asChild>
            <Button
              iconOnly
              variant="ghost"
              className="[&>svg]:h-5 [&>svg]:w-5"
            >
              <MenuIcon />
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left">
            <Sheet.Header>
              <Sheet.Title className="mb-0 capitalize">{title}</Sheet.Title>
              <Sheet.Description>{subTitle}</Sheet.Description>
            </Sheet.Header>

            <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start md:[&>a]:rounded-none mt-4">
              {links.map((category, key) => (
                <div className="!mb-3 flex flex-col items-stretch" key={key}>
                  <Card.Description className="pb-1 px-3">
                    {category.label}
                  </Card.Description>

                  {category.links.map((link, key) => (
                    <Button
                      variant="ghost"
                      asChild
                      key={key}
                      className={cn(
                        (link.active
                          ? pathname === link.active
                          : pathname.includes(link.href)) &&
                          "bg-muted [&>svg]:!text-foreground",
                        "justify-start px-3 mb-0.5"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href={`/subjects/${title.toLowerCase()}${link.href}`}
                      >
                        <link.Icon />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </Sheet.Content>
        </Sheet.Root>
      </nav>

      <aside className="hidden md:block grow basis-60 self-start sticky overflow-x-hidden overflow-y-auto w-60 border rounded-2xl py-2 top-4 print:!hidden">
        <Heading level={4} className="capitalize px-4 mb-0">
          {title}
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-4">
          {subTitle}
        </Text>

        <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start mt-4 px-1">
          {links.map((category, key) => (
            <div
              className="[&:not(:last-child)]:!mb-3 flex flex-col items-stretch"
              key={key}
            >
              <Card.Description className="pb-1 px-3">
                {category.label}
              </Card.Description>

              {category.links.map((link, key) => (
                <Button
                  variant="ghost"
                  asChild
                  key={key}
                  className={cn(
                    (link.active
                      ? pathname ===
                        link.active.replace("{subject}", title.toLowerCase())
                      : pathname.includes(link.href)) &&
                      "bg-muted [&>svg]:!text-foreground",
                    "justify-start px-3 mb-0.5"
                  )}
                >
                  <Link href={`/subjects/${title.toLowerCase()}${link.href}`}>
                    <link.Icon />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="md:pl-6 basis-0 flex-grow-[999]">{children}</main>
    </div>
  );
};
