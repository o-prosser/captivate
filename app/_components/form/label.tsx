"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { Label as LabelUi } from "@/ui/label";

import { useFormField } from "./field";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => {
  const { formItemId } = useFormField();

  return <LabelUi ref={ref} htmlFor={formItemId} {...props} />;
});
Label.displayName = "Label";
