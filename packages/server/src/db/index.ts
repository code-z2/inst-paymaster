const WeaveDB = require("weavedb-sdk-node");
import {existsSync, readFileSync} from "fs";
import path from "path";

const WEAVEDB_CONTRACT_TXID = path.resolve(__dirname, "../../weavedb/.wallets/contract-tx.json");

const ADMIN_ARWEAVE_WALLET = path.resolve(__dirname, "../../weavedb/.wallets/admin-wallet.json");

let db: any;
if (existsSync(ADMIN_ARWEAVE_WALLET) && existsSync(WEAVEDB_CONTRACT_TXID)) {
    const wallet = JSON.parse(readFileSync(ADMIN_ARWEAVE_WALLET, "utf8"));
    const {contractTxId} = JSON.parse(readFileSync(WEAVEDB_CONTRACT_TXID, "utf8"));

    db = new WeaveDB({
        arweave_wallet: wallet,
    });

    db.initialize({
        contractTxId,
        wallet,
    });
} else {
    console.log(
        `File ${ADMIN_ARWEAVE_WALLET} does not exist, please check the path and file name.`
    );
}

// allow for import keyword
export default db;
// allow for require keyword
module.exports = db;
