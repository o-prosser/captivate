import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const prisma = global.db || new PrismaClient();

if (process.env.NODE_ENV === "development") global.db = prisma;

export { prisma };
