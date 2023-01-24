import {existsSync, mkdirSync, writeFileSync} from "fs";
import {schema} from "./schema";
import {rules} from "./rules";
import {ArWallet, ContractDeploy, WarpFactory} from "warp-contracts";
import Wallet from "ethereumjs-wallet";
require("dotenv").config();

const Arweave = require("arweave");

const arweave = Arweave.init({
    host: "testnet.redstone.tools",
    port: 443,
    protocol: "https",
});

const folder = "weavedb/.wallets";

const options = {
    srcTxId: "9vwjxsX0856iTRFsEMEXBC7UFJ3Utok_e6dFyB1s4TA",
    contractTxId_II: "3OnjOPuWzB138LOiNxqq2cKby2yANw6RWcQVEkztXX8",
    contractTxId_ETH: "Awwzwvw7qfc58cKS8cG3NsPdDet957-Bf-S1RcHry0w",
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

const deployContracts = async (): Promise<{ok: boolean; wallet?: ArWallet}> => {
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
        return {ok: true, wallet: _wallet};
    } catch (error) {
        return {ok: false};
    }
};

const init = async () => {
    const res = await deployContracts();
    if (res.ok && res.wallet) {
        const addr = "0x70E2D5aA970d84780D81a2c4164b984Abaa94527";
        const _db = require("../src/db");
        const db = _db(process.env.ETH_PRIVATE_KEY);
        await db.setSchema(schema, "paymasters", {ar: res.wallet});
        console.log("setSchema complete!");
        await db.setRules(rules(addr.toLowerCase()), "paymasters", {
            ar: res.wallet,
        });
        console.log("setRules complete!");
        return;
    }

    console.log("an error occured while setting up arweave contracts.");
};

init();
