import { mergeRouters } from "../trpc";
import { siweRouter } from "./auth";
import { paymastersRouter } from "./paymasters";
import { submissionRouter } from "./submission";

const appRouter = mergeRouters(paymastersRouter, submissionRouter, siweRouter);

export default appRouter;
