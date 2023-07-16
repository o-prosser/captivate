import NextAuth from "next-auth/next";
import nodemailer from "nodemailer";

import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
