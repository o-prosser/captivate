import Link from "next/link";
import { XCircle } from "lucide-react";

import * as Alert from "@/ui/alert";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import { action } from "./actions";

export const metadata = {
  title: "Login",
};

const Login = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <>
      <Heading>Welcome back 👋</Heading>
      <Text className="mt-3 mb-6">Enter your email to login to Captivate.</Text>
      <form action={action} className="space-y-6 text-left mt-6">
        {searchParams.error ? (
          <Alert.Root variant="destructive">
            <XCircle />
            <Alert.Description>
              {searchParams.error === "credentials" ? (
                <>Incorrect email or password.</>
              ) : (
                "An unknown error occured. Please try again later."
              )}
            </Alert.Description>
          </Alert.Root>
        ) : (
          ""
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            autoFocus
            placeholder="Email address"
            defaultValue={searchParams.email || ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="new-password"
            autoFocus
            placeholder="Password"
            defaultValue={searchParams.error && ""}
          />
        </div>

        <FormButton className="w-full">Log in</FormButton>
      </form>
      <Text>
        No account?{" "}
        <Button variant="link" asChild>
          <Link href="/signup">Create an account</Link>
        </Button>{" "}
        now.
      </Text>
    </>
  );
};

export default Login;

// export const runtime = "edge";
