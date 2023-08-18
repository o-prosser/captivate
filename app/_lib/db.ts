import * as schema from "@/drizzle/schema";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env.mjs";

neonConfig.fetchConnectionCache = true;

const sql = neon(env.DRIZZLE_DATABASE_URL);

export * from "drizzle-orm";

export const db = drizzle(sql, {
  schema,
  // logger: process.env.NODE_ENV === "development",
});
