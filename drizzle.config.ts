import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema/*",
  driver: "pg",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}?sslmode=require`,
  },
} satisfies Config;
