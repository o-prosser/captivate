import { Button, Heading, Sheet, Text } from "@/ui";
import { MenuIcon } from "lucide-react";
import { ReactNode } from "react";

export const SubjectLayout = ({
  title,
  subTitle,
  links,
  children,
}: {
  title: string;
  subTitle: string;
  links: ReactNode;
  children: ReactNode;
}) => {
  return (
    // @ts-ignore
    <div style={{ "--primary": `var(--${title.toLowerCase()})` }}>
      <nav className="flex items-center border-b fixed inset-x-6 top-16 bg-background h-12 z-10 md:hidden print:!hidden">
        <Sheet.Root>
          <Sheet.Trigger asChild>
            <Button
              iconOnly
              variant="ghost"
              className="[&>svg]:h-5 [&>svg]:w-5 text-opacity-75 -ml-3 hover:bg-background"
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
              {links}
            </div>
          </Sheet.Content>
        </Sheet.Root>
      </nav>

      <aside className="hidden md:block md:fixed overflow-x-hidden overflow-y-auto rounded-2xl w-60 border py-4 fixed inset-y-2 left-[5.5rem] print:!hidden">
        <Heading level={4} className="capitalize px-3 mb-0">
          {title}
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-3">
          {subTitle}
        </Text>

        <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start md:[&>a]:rounded-none mt-4">
          {links}
        </div>
      </aside>

      <main className="min-h-screen md:pl-[17rem] print:!p-0 pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
};
