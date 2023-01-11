const SDK = require("weavedb-sdk-node");
import ADMIN_ARWEAVE_WALLET_JSON from "../../weavedb/.wallets";
require("dotenv").config();

const WEAVEDB_CONTRACT_TX_ID = process.env.WEAVEDB_CONTRACT_TX_ID;

const db = new SDK({
    arweave_wallet: ADMIN_ARWEAVE_WALLET_JSON,
});

db.initialize({
    contractTxId: WEAVEDB_CONTRACT_TX_ID,
    wallet: ADMIN_ARWEAVE_WALLET_JSON,
});

export default db;
