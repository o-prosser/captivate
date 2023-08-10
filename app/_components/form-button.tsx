"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { experimental_useFormStatus } from "react-dom";

import { Button, ButtonProps } from "@/ui/button";

const FormButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { pending } = experimental_useFormStatus();

    return (
      <Button disabled={pending} {...props} ref={ref}>
        {pending ? <Loader2 className="animate-spin" /> : ""}
        {children}
      </Button>
    );
  }
);
FormButton.displayName = "FormButton";

export { FormButton };
