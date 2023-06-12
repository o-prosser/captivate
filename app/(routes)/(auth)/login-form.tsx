"use client";

import { Form } from "@/components";
import { Button } from "@/ui";
import { useState } from "react";
import * as z from "zod";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().min(3, { message: "Please provide an email." }).email(),
});

const LoginForm = () => {
  const form = Form.useForm({ schema });

  const [pending, setPending] = useState(false);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setPending(true);

    await signIn("email", {
      email: values.email,
    }).catch((error) => {
      setPending(false);
      form.setError("email", {
        type: "custom",
        message: "An unknown error occurred. Please try again.",
      });
    });
  };

  return (
    <Form.Root form={form} onSubmit={onSubmit} className="space-y-6 text-left">
      <Form.Field
        control={form.control}
        name="email"
        label="Email address"
        input={{ placeholder: "Email address" }}
      />

      <Button className="w-full" type="submit" pending={pending}>
        <LogInIcon />
        Log in with email
      </Button>
    </Form.Root>
  );
};

export default LoginForm;
