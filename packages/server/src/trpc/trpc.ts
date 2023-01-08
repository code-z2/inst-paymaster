import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import SuperJSON from "superjson";

export const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;

const authenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.req.session.siwe) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({
    ctx: {
      address: ctx.req.session.siwe?.address,
    },
  });
});

export const protectedProcedure = publicProcedure.use(authenticated);
