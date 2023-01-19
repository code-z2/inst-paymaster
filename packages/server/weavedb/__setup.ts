import {existsSync, mkdirSync, writeFileSync} from "fs";
import {schema} from "./schema";
import {rules} from "./rules";
import {ArWallet, ContractDeploy, WarpFactory} from "warp-contracts";
require("dotenv").config();

const arweave = require("arweave").init({
    host: "testnet.redstone.tools",
    port: 443,
    protocol: "https",
});

const folder = "weavedb/.wallets";

const options = {
    srcTxId: process.env.SOURCE_TX_ID || "WjNDXc_4uztn570rnzJs6R1f_XyR3culWG3LDk2TJgs",
    contractTxId_II: process.env.II_SOURCE_TX_ID || "3OnjOPuWzB138LOiNxqq2cKby2yANw6RWcQVEkztXX8",
    contractTxId_ETH: process.env.ETH_SOURCE_TX_ID || "Awwzwvw7qfc58cKS8cG3NsPdDet957-Bf-S1RcHry0w",
};

const initialState = {
    canEvolve: true,
    evolve: null,
    secure: true,
    version: "0.10.0",
    data: {},
    nonces: {},
    ids: {},
    indexes: {},
    auth: {
        algorithms: ["secp256k1", "secp256k1-2", "ed25519", "rsa256"],
        name: "weavedb",
        version: "1",
        links: {},
    },
    crons: {
        lastExecuted: 0,
        crons: {},
    },
};

const generateWallet = async () => {
    const file = "admin-wallet.json";

    let ADMIN_ARWEAVE_WALLET_JSON: ArWallet;

    if (!existsSync(`${folder}/${file}`)) {
        mkdirSync(folder, {recursive: true});
        ADMIN_ARWEAVE_WALLET_JSON = await arweave.wallets.generate();
        writeFileSync(`${folder}/${file}`, JSON.stringify(ADMIN_ARWEAVE_WALLET_JSON));
        console.log(`File ${file} has been created in ${folder} folder with a new Arweave wallet.`);
    } else {
        console.log(`found existing wallet in ${folder} using ${file}.`);
        ADMIN_ARWEAVE_WALLET_JSON = require(`./.wallets/${file}`);
    }

    return ADMIN_ARWEAVE_WALLET_JSON;
};

const writeContractTxIdToFile = (res: ContractDeploy) => {
    // @notice - this function overwrites the existing contract txid.
    // only `yarn weave` again if you need a fresh start
    const file = "contract-tx.json";
    writeFileSync(`${folder}/${file}`, JSON.stringify(res));
    console.log(`ContractTxId has been written to ${folder}/${file}.`);
};

const deployContracts = async () => {
    const _wallet = await generateWallet();
    const walletAddress = await arweave.wallets.jwkToAddress(_wallet);
    console.log("your arweave wallet address is: ", walletAddress);

    const currentState = {
        ...initialState,
        owner: walletAddress,
        contracts: {
            dfinity: options.contractTxId_II,
            ethereum: options.contractTxId_ETH,
        },
    };

    const warp = WarpFactory.forMainnet();

    try {
        const res = await warp.deployFromSourceTx({
            wallet: _wallet,
            initState: JSON.stringify(currentState),
            srcTxId: options.srcTxId,
        });
        console.log("weaveDB contracts deployed with \n", res);
        writeContractTxIdToFile(res);
        return true;
    } catch (error) {
        return false;
    }
};

const init = async () => {
    const success = await deployContracts();
    if (success) {
        const _db = require("../src/db");
        const db = _db();
        await db.setSchema(schema, "paymasters");
        console.log("setSchema complete!");
        await db.setRules(rules(process.env.ADMIN_ETH_ADDRESS as string), "paymasters");
        console.log("setRules complete!");
        const {identity} = db.createTempAddress("0x70E2D5aA970d84780D81a2c4164b984Abaa94527");
        console.log(identity);
        return;
    }

    console.log("an error occured while setting up arweave contracts.");
};

init();
