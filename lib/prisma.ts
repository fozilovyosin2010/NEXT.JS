import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Use an absolute path so Next.js server actions can resolve the database file correctly in all worker threads
const dbPath = path.join(process.cwd(), "dev.db");

const adapter = new PrismaBetterSqlite3({
  url: dbPath
});

// Instantiate PrismaClient with the adapter
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
