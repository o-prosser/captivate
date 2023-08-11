import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema/*",
  driver: "pg",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: `postgres://o-prosser:rYnM27vXQEfi@ep-polished-violet-43602101-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`,
  },
} satisfies Config;
