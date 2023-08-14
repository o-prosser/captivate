import Link from "next/link";

import * as Alert from "@/ui/alert";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import { action } from "./actions";

export const metadata = {
  title: "Signup",
};

const SignUp = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <>
      <Heading>Welcome to Captivate 👋</Heading>
      <form action={action} className="space-y-6 text-left mt-6">
        {searchParams.error ? (
          <Alert.Root variant="destructive">
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>
              {searchParams.error === "duplicate" ? (
                <>
                  A user with this email address already exists. Would you like
                  to{" "}
                  <Button variant="link" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </>
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

        <FormButton className="w-full">Sign up</FormButton>
      </form>
      <Text>
        Already got an account?{" "}
        <Button variant="link" asChild>
          <Link href="/login">Login</Link>
        </Button>{" "}
        now.
      </Text>
    </>
  );
};

export default SignUp;
