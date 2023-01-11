import db from "../src/db";
import {schema} from "./schema";
import {rules} from "./rules";
import ADMIN_ARWEAVE_WALLET_JSON from "./.wallets";

const init = async () => {
    // await db.setSchema(schema, "paymasters");
    // console.log("setSchema complete!");
    // await db.setRules(
    //     rules(process.env.ADMIN_ETH_ADDRESS as string),
    //     "paymasters"
    // );
    // console.log("setRules complete!");
    // await db.add(
    //     {
    //         task: "paymasters",
    //         date: db.ts(),
    //         user_address: db.signer(),
    //         done: false,
    //     },
    //     "tasks"
    // );
    console.log(await db.getOwner());
    console.log(
        await db.arweave.wallets.jwkToAddress(ADMIN_ARWEAVE_WALLET_JSON)
    );
};

init();
