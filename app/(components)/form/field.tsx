"use client";

import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { ItemContext } from "./item";
import { Input } from "@/ui";
import { Form } from "..";

export type FieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FieldContext = React.createContext<FieldContextValue>(
  {} as FieldContextValue,
);

export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  render,
  input,
  message = true,
  description,
  label,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  message?: boolean;
  description?: string;
  label?: string;
  input: ComponentProps<"input">;
  render?: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
}) => {
  return (
    <FieldContext.Provider value={{ name: props.name }}>
      <Controller
        render={
          render
            ? render
            : ({ field }) => (
                <Form.Item>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control>
                    <Input {...input} {...field} />
                  </Form.Control>
                  {description && (
                    <Form.Description>{description}</Form.Description>
                  )}
                  {message && <Form.Message />}
                </Form.Item>
              )
        }
        {...props}
      />
    </FieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = React.useContext(FieldContext);
  const itemContext = React.useContext(ItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
