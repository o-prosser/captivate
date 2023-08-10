import { pg } from "@lucia-auth/adapter-postgresql";
import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";

import "lucia/polyfill/node";

import { pool } from "./db";

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs(),
  adapter: pg(pool, {
    user: "User",
    key: "Key",
    session: "Session",
  }),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      email: data.email,
      username: data.username,
      name: data.name,
      image: data.image,
      emailVerifiedAt: data.emailVerifiedAt,
      token: data.token,
    };
  },
});

export type Auth = typeof auth;
