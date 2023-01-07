import { mergerouters } from "../trpc";
import { siweRouter } from "./auth";
import { paymastersRouter } from "./paymasters";
import { submissionRouter } from "./submission";

const appRouter = mergerouters(paymastersRouter, submissionRouter, siweRouter);

export default appRouter;
