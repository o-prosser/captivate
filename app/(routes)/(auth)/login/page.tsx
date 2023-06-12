import { Button, Heading, Text } from "@/ui";
import LoginForm from "../login-form";
import Link from "next/link";

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
