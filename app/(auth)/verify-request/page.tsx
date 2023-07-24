import { CheckCircleIcon } from "lucide-react";

import * as Alert from "@/ui/alert";
import { Heading, Text } from "@/ui/typography";

import Code from "./_components/code";

export const metadata = {
  title: "Check your email",
};

const VerifyRequest = () => {
  return (
    <>
      <Heading className="text-center mb-8">✉️ Check your email</Heading>

      <Alert.Root className="text-left" variant="success">
        <CheckCircleIcon className="h-4 w-4" />
        <Alert.Description>
          We&apos;ve sent you a email containing a login code and a link. Click
          the click or enter the 6-digit code below.
        </Alert.Description>
      </Alert.Root>

      <Code />

      <Text className="text-center text-muted-foreground">
        If you can&apos;t find your email, check your spam folder.
      </Text>
    </>
  );
};

export default VerifyRequest;
