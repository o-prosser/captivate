import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const LoginEmail = ({
  url,
  host,
  token,
}: {
  url: string;
  host: string;
  token: string;
}) => {
  return (
    <Html lang="en">
      <Head />

      <Tailwind>
        <Body className="mx-auto my-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                className="h-8 mx-auto my-0"
                src="https://captivate.prossermedia.co.uk/logo.png"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Sign in to <strong>Captivate</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello user,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Copy the code below to sign in to Captivate.
            </Text>
            <Section className="flex mt-4 mb-6 justify-center">
              <Text className="text-black font-mono p-1 bg-[#eaeaea] rounded-sm tracking-widest">
                {token}
              </Text>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              or click to sign in.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#273F8B] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={url}
              >
                Sign in
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px] break-all">
              If the link didn't work, copy and this url into your browser:{" "}
              <Link href={url} className="text-[#273F8B] no-underline">
                {url}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-black text-[12px] leading-[20px]">
              If you did not request this email you can safely ignore it.
            </Text>
            <Text className="text-slate-600 text-[12px] leading-[20px]">
              &copy; Prosser Media {new Date().getFullYear()}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default LoginEmail;
