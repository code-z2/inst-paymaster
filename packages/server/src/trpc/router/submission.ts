import {protectedProcedure, router} from "../trpc"

import {z} from "zod"

export const submissionRouter = router({
    apply: protectedProcedure
        .input(
            z.object({
                address: z.string().length(42),
            })
        )
        .mutation(async ({ctx, input}) => {
            try {
                ctx.db.add(input.address)
                return input
            } catch (error) {
                console.log(error)
            }
        }),
})
