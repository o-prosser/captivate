import { Heading, Text } from "@/ui";

export const metadata = {
  title: "Check your email",
};

const VerifyRequest = () => {
  return (
    <>
      <Heading className="text-center mb-8">✉️ Check your email</Heading>

      <Text className="text-center">
        We've sent you a link to login to Captivate.
      </Text>
      <Text className="text-center text-muted-foreground">
        If you can't find your email, check your spam folder.
      </Text>
    </>
  );
};

export default VerifyRequest;
