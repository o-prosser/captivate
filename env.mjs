import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    DRIZZLE_DATABASE_URL: z.string(),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    WEATHER_API_KEY: z.string().min(1),
    EMAIL_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    EMAIL_FROM_NAME: z.string().min(1),
  },
});
