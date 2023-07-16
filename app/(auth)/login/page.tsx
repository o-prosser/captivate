import Link from "next/link";

import { Button } from "@/ui/button";
import { Heading, Text } from "@/ui/typography";

import LoginForm from "../_components/login-form";

export const metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <>
      <Heading>Welcome back 👋</Heading>
      <Text className="mt-3 mb-6">Enter your email to login to Captivate.</Text>
      <LoginForm />
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
