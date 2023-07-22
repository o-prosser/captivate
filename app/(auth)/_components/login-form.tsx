"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import * as z from "zod";

import { Button } from "@/ui/button";
import * as Form from "@/components/form";

const schema = z.object({
  email: z.string().min(3, { message: "Please provide an email." }).email(),
});

const LoginForm = () => {
  const form = Form.useForm({ schema });

  const [pending, setPending] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setPending(true);

    await signIn("email", {
      email: values.email,
      redirect: false,
    }).catch((error) => {
      setPending(false);
      form.setError("email", {
        type: "custom",
        message: "An unknown error occurred. Please try again.",
      });
    });

    router.push(`/verify-request?email=${encodeURIComponent(values.email)}`);
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
        {pathname.includes("login") ? "Log in" : "Sign up"} with email
      </Button>
    </Form.Root>
  );
};

export default LoginForm;
