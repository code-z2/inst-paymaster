const SDK = require("weavedb-sdk-node");
import {existsSync, readFileSync} from "fs";
import path from "path";
import Wallet from "ethereumjs-wallet";
import {toBuffer} from "ethereumjs-util";
require("dotenv").config();

const WEAVEDB_CONTRACT_TXID = path.resolve(__dirname, "../../weavedb/.wallets/contract-tx.json");

const ADMIN_ARWEAVE_WALLET = path.resolve(__dirname, "../../weavedb/.wallets/admin-wallet.json");

const db = (privateKey?: string): {_db: any; contractTxId: string} | undefined => {
    let _db: any;
    let contractTxId: string;
    if (existsSync(ADMIN_ARWEAVE_WALLET) && existsSync(WEAVEDB_CONTRACT_TXID)) {
        const wallet = JSON.parse(readFileSync(ADMIN_ARWEAVE_WALLET, "utf8"));
        contractTxId = JSON.parse(readFileSync(WEAVEDB_CONTRACT_TXID, "utf8")).contractTxId;
        const EthWallet = Wallet.fromPrivateKey(
            toBuffer(privateKey || process.env.ETH_PRIVATE_KEY)
        );

        _db = new SDK({
            contractTxId,
            wallet,
            EthWallet,
        });
    } else {
        console.log(
            `File ${ADMIN_ARWEAVE_WALLET} does not exist, please check the path and file name.`
        );
        return;
    }
    return _db;
};

// allow for import keyword
export default db;
// allow for require keyword
module.exports = db;
