import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

import { createVar } from "@/util/cn";

const SubjectCard = ({
  subject,
  design = "standard",
  ...props
}: {
  design?: "standard" | "compact";
  subject: string | null;
} & React.ComponentProps<"div">) => {
  return (
    <div
      style={createVar({
        "--subject": `var(--${subject || "muted-foreground"})`,
      })}
      data-design={design}
      className={clsx(
        "bg-gradient-to-b from-subject/30 to-subject/10 dark:bg-subject/10 rounded-2xl py-3 px-4 group",
      )}
      {...props}
    />
  );
};

const Header = (props: React.ComponentProps<"div">) => (
  <div className="relative flex justify-between items-start" {...props} />
);

const Title = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4
    className={clsx(
      "font-semibold leading-6 text-subject brightness-50 dark:brightness-100",
      className,
    )}
    {...props}
  />
);

const Description = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={clsx(
      "text-subject text-sm brightness-75 group-data-[design='compact']:brightness-50 dark:!brightness-90",
      className,
    )}
    {...props}
  />
);

const Action = (props: React.ComponentProps<typeof Slot>) => (
  <Slot
    className="-mr-1.5 -mt-1.5 hover:bg-subject/20 [&.group:hover>svg]:text-subject"
    {...props}
  />
);

const Footer = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={clsx("flex items-end justify-between mt-2", className)}
    {...props}
  />
);

const Caption = ({ className, ...props }: React.ComponentProps<"p">) => (
  <div
    className={clsx(
      "text-subject text-sm brightness-50 dark:brightness-95",
      className,
    )}
    {...props}
  />
);

SubjectCard.Header = Header;
SubjectCard.Title = Title;
SubjectCard.Description = Description;
SubjectCard.Action = Action;
SubjectCard.Footer = Footer;
SubjectCard.Caption = Caption;

export { SubjectCard };
