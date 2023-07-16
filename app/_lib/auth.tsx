import { PrismaAdapter } from "@auth/prisma-adapter";
import { render } from "@react-email/render";
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

import { env } from "@/env.mjs";
import LoginEmail from "@/emails/login";
import { prisma } from "@/app/_lib/prisma";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/login",
    error: "/auth-error",
    verifyRequest: "/verify-request",
    newUser: "/auth/new-user",
  },
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: parseInt(env.EMAIL_SERVER_PORT),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider, theme }) {
        const { host } = new URL(url);
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to Captivate`,
          text: render(<LoginEmail url={url} host={host} />, {
            plainText: true,
          }),
          html: render(<LoginEmail url={url} host={host} />),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
};

export { authOptions };
