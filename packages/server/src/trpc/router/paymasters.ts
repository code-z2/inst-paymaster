import {publicProcedure, router} from "../trpc";
import {Provider} from "zksync-web3";
import {ethers} from "ethers";
import {z} from "zod";

const queryAggregatorContract = async (address?: string, chain?: string, selector?: string) => {
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const aggregatorContract = new ethers.Contract(
        address || (process.env.DEFAULT_AGGREGATOR_ADDRESS as string),
        [selector || "function getAll() view returns (address[] memory)"],
        zkSyncProvider
    );

    const all = await aggregatorContract.getAll();

    return all;
};

export const paymastersRouter = router({
    paymasters: publicProcedure
        .input(
            z.object({
                address: z.string().length(42).optional(),
                chain: z.string().optional(),
                selector: z.string().optional(),
            })
        )
        .query(async ({input}) => {
            try {
                const paymasters = await queryAggregatorContract(
                    input.address,
                    input.chain,
                    input.selector
                );
                return paymasters;
            } catch (error: any) {
                return {
                    ok: false,
                    error: error?.message ?? "Unknown error",
                };
            }
        }),
});
