import {protectedProcedure, router} from "../trpc";
import {z} from "zod";

const zObject = z.object({
    name: z.string(),
    user_address: z.string().length(42),
    contract_address: z.string().length(42),
    metadata: z.string(),
});

const submit = async (db: any, user: any, input: z.infer<typeof zObject>) =>
    await db.add(
        {
            name: input.name,
            user_address: db.signer(),
            contract_address: input.contract_address,
            metadata: input.metadata,
            approved: false,
            created_at: db.ts(),
            // optionals
            updated_at: db.ts(),
            audited: false,
        },
        "paymasters",
        {
            wallet: user.wallet,
            privateKey: user.identity.privateKey,
        }
    );

export const submissionRouter = router({
    apply: protectedProcedure.input(zObject).mutation(async ({ctx, input}) => {
        try {
            await submit(ctx.db, ctx.req.session.weavedbUser, input);
            return {ok: true};
        } catch (error: any) {
            return {
                ok: false,
                error: error?.message ?? "Unknown error",
            };
        }
    }),
});
