import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "../db/client";

const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
  prisma,
});
type Context = inferAsyncReturnType<typeof createContext>;

export { createContext, Context };
