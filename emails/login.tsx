import * as React from "react";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Heading } from "@react-email/heading";
import { Button } from "@react-email/button";
import { Font } from "@react-email/font";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";
import { Head } from "@react-email/head";

const LoginEmail = ({ url, host }: { url: string; host: string }) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Tailwind
        config={{
          theme: {
            extends: {
              colors: {
                primary: {
                  DEFAULT: "#273F8B",
                  hover: "#2F4DB1",
                },
              },
            },
          },
        }}
      >
        <Img
          className="block w-auto mx-auto h-14"
          src="https://captivate.prossermedia.co.uk/logo.png"
        />
        <Heading as="h1">Sign in to Captivate</Heading>

        <Button
          href={url}
          className="inline-flex items-center justify-center rounded-xl bg-primary text-slate-100 hover:bg-primary-hover"
        >
          Sign in
        </Button>

        <Text>If you did not request this email you can safely ignore it.</Text>

        <Text>&copy Prosser Media {new Date().getFullYear()}</Text>
      </Tailwind>
    </Html>
  );
};

export default LoginEmail;
