"use client";

import { useForm as useFormPrimitive, FormProvider } from "react-hook-form";
import type {
  UseFormProps,
  FormProviderProps,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import type { ComponentProps } from "react";

export const useForm = ({
  schema,
  ...props
}: Omit<UseFormProps, "resolver"> & { schema: ZodType<any, any> }) => {
  return useFormPrimitive({
    resolver: zodResolver(schema),
    ...props,
  });
};

export const Root = ({
  onSubmit,
  form,
  ...props
}: {
  form: Omit<FormProviderProps, "children">;
  onSubmit: SubmitHandler<any>;
} & Omit<ComponentProps<"form">, "onSubmit">) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props} />
    </FormProvider>
  );
};
