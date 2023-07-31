import { notFound } from "next/navigation";

import { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";

import { SubjectLayout } from "./_components/subject-layout";
import links from "./links";

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
    <SubjectLayout
      title={subject.name}
      subTitle={subject.fullName}
      links={links}
    >
      {children}
    </SubjectLayout>
  );
};

export default Layout;
