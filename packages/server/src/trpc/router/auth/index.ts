import {generateNonce, SiweMessage} from "siwe"
import {z} from "zod"
import {router, publicProcedure, protectedProcedure} from "../../trpc"

export const siweRouter = router({
    siweNonce: publicProcedure.query(async ({ctx}) => {
        const currentDate = new Date()

        // Setup Session
        ctx.req.session.nonce = generateNonce()
        ctx.req.session.issuedAt = currentDate.toISOString()
        ctx.req.session.expirationTime = new Date(
            currentDate.getTime() + 5 * 60 * 1000 // 5 minutes from the current time
        ).toISOString()

        // Save Session
        await ctx.req.session.save()

        // Return
        return {
            nonce: ctx.req.session.nonce,
            issuedAt: ctx.req.session.issuedAt,
            expirationTime: ctx.req.session.expirationTime,
        }
    }),

    siweVerify: publicProcedure
        .input(
            z.object({
                message: z.object({
                    domain: z.string(),
                    address: z.string().length(42),
                    statement: z.string().optional(),
                    uri: z.string(),
                    version: z.string(),
                    chainId: z.number(),
                    nonce: z.string(),
                    issuedAt: z.string(),
                    expirationTime: z.string().optional(),
                    notBefore: z.string().optional(),
                    requestId: z.string().optional(),
                    resources: z.array(z.string()).optional(),
                    signature: z.string().optional(),
                    type: z.literal("Personal signature").optional(),
                }),
                signature: z.string(),
            })
        )
        .mutation(async (req) => {
            try {
                const siweMessage = new SiweMessage(
                    req.input.message as SiweMessage
                )
                const fields = await siweMessage.validate(req.input.signature)
                if (fields.nonce !== req.ctx.req.session.nonce) {
                    throw new Error("Invalid nonce.")
                }

                req.ctx.req.session.siwe = fields
                // persist user weave identity
                const {identity} = req.ctx.db.createTempAddress(fields.address)

                req.ctx.req.session.weavedbUser = {
                    wallet: fields.address,
                    identity,
                }

                req.ctx.req.session.weavedbUser.identity.linked_address =
                    fields.address

                await req.ctx.req.session.save()
                return {ok: true}
            } catch (error: any) {
                return {
                    ok: false,
                    error: error?.message ?? "Unknown error",
                }
            }
        }),

    siweDetails: protectedProcedure.query(async ({ctx}) => {
        const siwe = ctx.req.session.siwe
        return {
            address: siwe?.address,
            chainid: siwe?.chainId,
            issuedAt: siwe?.issuedAt,
            expires: siwe?.expirationTime,
            nonce: siwe?.nonce,
            domain: siwe?.domain,
        }
    }),

    siweLogout: protectedProcedure.query(async ({ctx}) => {
        ctx.req.session.destroy()
        return {ok: true}
    }),
})
