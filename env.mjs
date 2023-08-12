import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    DRIZZLE_DATABASE_URL: z.string(),
    WEATHER_API_KEY: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    EMAIL_KEY: z.string().min(1),
    EMAIL_FROM_NAME: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    JOSE_SESSION_KEY: z.string().min(1),
    SALT_KEY: z.string().min(1),
  },
});
