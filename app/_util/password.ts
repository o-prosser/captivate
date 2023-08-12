import { env } from "@/env.mjs";

import pbkdf2 from "./pbkdf2";

export const runtime = "edge";

const saltKey = env.SALT_KEY;
const hashIterations = 10000;

export const hashPassword = async (raw: string) => {
  const key = await pbkdf2(raw, saltKey, hashIterations, 64);
  return key;
};

export const isMatchingPassword = async (raw: string, hashed: string) => {
  const hash = await pbkdf2(raw, saltKey, hashIterations, 64);
  return hashed === hash;
};
