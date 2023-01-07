import { protectedProcedure, router } from "../trpc";

import { z } from "zod";

export const submissionRouter = router({
  apply: protectedProcedure
    .input(
      z.object({
        address: z.string().length(42),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        ctx.prisma.paymasters.create({
          data: {
            name: "paymasters.io",
            contractAddress: "",
            codebaseurl: "",
            status: "pending",
            approved: false,
            audited: false,
            socials: [],
            metadata: "",
          },
        });
        return input;
      } catch (error) {
        console.log(error);
      }
    }),
});
