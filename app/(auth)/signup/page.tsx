import Link from "next/link";

import { Button } from "@/ui/button";
import { Heading, Text } from "@/ui/typography";

import LoginForm from "../_components/login-form";

export const metadata = {
  title: "Signup",
};

const Login = () => {
  return (
    <>
      <Heading>Welcome to Captivate 👋</Heading>
      <Text className="mt-3 mb-6">
        Enter your email to signup to Captivate.
      </Text>
      <LoginForm />
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

export default Login;
