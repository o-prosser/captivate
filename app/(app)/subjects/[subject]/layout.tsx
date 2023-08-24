import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { SubjectPageProps } from "@/types/subjects";
import { createVar } from "@/util/cn";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Heading, Text } from "@/ui/typography";
import ActiveLink from "@/components/active-link";

import links from "./links";

const SubjectHeader = dynamic(() => import("./_components/subject-header"));

export const generateMetadata = ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  return {
    title: {
      template: `${subject.name} – %s`,
      default: subject.name,
    },
  };
};

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
} & SubjectPageProps) => {
  let subject;
  try {
    subject = getSubject(params.subject);
  } catch (error) {
    notFound();
  }

  return (
    <div
      className="relative flex print:[--primary:226_56%_35%]"
      style={createVar({ "--primary": `var(--${params.subject})` })}
    >
      <SubjectHeader
        title={subject.name}
        subTitle={subject.fullName}
        links={
          <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start md:[&>a]:rounded-none mt-4">
            {links.map((category, key) => (
              <div className="!mb-3 flex flex-col items-stretch" key={key}>
                <p className="pb-1 px-3 text-muted-foreground text-sm font-medium">
                  {category.label}
                </p>

                {category.links.map((link, key) => (
                  <ActiveLink
                    match={link.active ? "equals" : "includes"}
                    key={key}
                    active={
                      link.active
                        ? link.active.replace("{subject}", params.subject)
                        : link.href
                    }
                  >
                    <Button
                      variant="ghost"
                      asChild
                      key={key}
                      className="justify-start px-3 mb-0.5"
                    >
                      <Link href={`/subjects/${params.subject}${link.href}`}>
                        <link.Icon />
                        {link.label}
                      </Link>
                    </Button>
                  </ActiveLink>
                ))}
              </div>
            ))}
          </div>
        }
      />

      <aside className="hidden md:block grow basis-60 self-start sticky overflow-x-hidden overflow-y-auto w-60 border rounded-2xl py-3 top-4 print:!hidden min-h-[calc(100dvh-128px)]">
        <Heading level={4} className="capitalize px-4 mb-0">
          {subject.name}
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-4">
          {subject.fullName}
        </Text>

        <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start mt-4 px-1">
          {links.map((category, key) => (
            <div
              className="[&:not(:last-child)]:!mb-3 flex flex-col items-stretch"
              key={key}
            >
              <p className="pb-1 px-3 text-sm text-muted-foreground">
                {category.label}
              </p>

              {category.links.map((link, key) => (
                <ActiveLink
                  key={key}
                  match={link.active ? "equals" : "includes"}
                  active={
                    link.active
                      ? link.active.replace("{subject}", params.subject)
                      : link.href
                  }
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start px-3 mb-0.5"
                  >
                    <Link href={`/subjects/${params.subject}${link.href}`}>
                      <link.Icon />
                      {link.label}
                    </Link>
                  </Button>
                </ActiveLink>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="md:pl-6 basis-0 flex-grow-[999]">{children}</main>
    </div>
  );
};

export default Layout;
