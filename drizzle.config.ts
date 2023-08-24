import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./drizzle/schema/*",
  driver: "pg",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: `${
      process.env.DRIZZLE_DATABASE_URL as string
    }?sslmode=require`,
  },
} satisfies Config;
