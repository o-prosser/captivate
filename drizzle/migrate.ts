/* eslint-disable no-console */
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const main = async () => {
  if (process.env["VERCEL"] ?? process.env["NODE_ENV"] === "development") {
    try {
      const databaseUrl = drizzle(
        postgres(`${process.env.DATABASE_URL}`, { ssl: "require", max: 1 })
      );

      await migrate(databaseUrl, { migrationsFolder: "drizzle" });
      console.log("\n🚀 Migration complete!");
    } catch (error) {
      console.log(error);
    }

    process.exit(0);
  }

  console.log("Not running on Vercel, skipping migration");
};

void main();
/* eslint-enable no-console */
