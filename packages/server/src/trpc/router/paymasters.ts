import { publicProcedure, router } from "../trpc";

export const paymastersRouter = router({
  paymasters: publicProcedure.query((req) => {
    console.log("what is the issue");
    return "a test item";
  }),
});
