import { Heading, Text } from "@/ui/typography";

export const metadata = {
  title: "Check your email",
};

const VerifyRequest = () => {
  return (
    <>
      <Heading className="text-center mb-8">✉️ Check your email</Heading>

      <Text className="font-bold">Thanks for signing up to Captivate.</Text>

      <Text>
        To get started, please follow the link in the email we&apos;ve sent to
        verify your email address.
      </Text>

      <Text className="text-center text-muted-foreground">
        If you can&apos;t find your email, check your spam folder.
      </Text>
    </>
  );
};

export default VerifyRequest;
