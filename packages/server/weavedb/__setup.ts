import {existsSync, mkdirSync, writeFileSync} from "fs";
import {schema} from "./schema";
import {rules} from "./rules";
import {ContractDeploy, WarpFactory} from "warp-contracts";

const arweave = require("arweave").init({
    host: "testnet.redstone.tools",
    port: 443,
    protocol: "https",
});

const folder = "weavedb/.wallets";

const options = {
    srcTxId:
        process.env.SOURCE_TX_ID ||
        "WjNDXc_4uztn570rnzJs6R1f_XyR3culWG3LDk2TJgs",
    contractTxId_II:
        process.env.II_SOURCE_TX_ID ||
        "3OnjOPuWzB138LOiNxqq2cKby2yANw6RWcQVEkztXX8",
    contractTxId_ETH:
        process.env.ETH_SOURCE_TX_ID ||
        "Awwzwvw7qfc58cKS8cG3NsPdDet957-Bf-S1RcHry0w",
};

const generateWallet = async () => {
    const file = "admin-wallet.json";

    if (!existsSync(`${folder}/${file}`)) {
        mkdirSync(folder, {recursive: true});
        await arweave.wallets.generate().then((wallet: any) => {
            writeFileSync(`${folder}/${file}`, JSON.stringify(wallet));
            console.log(
                `File ${file} has been created in ${folder} folder with a new Arweave wallet.`
            );
        });
    } else {
        console.log(`found existing wallet in ${folder} using ${file}.`);
    }

    const ADMIN_ARWEAVE_WALLET_JSON = require(`./.wallets/${file}`);

    return ADMIN_ARWEAVE_WALLET_JSON;
};

const writeContractTxIdToFile = (res: ContractDeploy) => {
    // @notice - this function overwrites the existing contract txid.
    // only `yarn weave` again if you to a fresh start
    const file = "contract-tx.json";
    writeFileSync(`${folder}/${file}`, JSON.stringify(res));
    console.log(`ContractTxId has been written to ${folder}/${file}.`);
};

const deployContracts = async () => {
    const _wallet = await generateWallet();
    const walletAddress = await arweave.wallets.jwkToAddress(_wallet);
    console.log("your arweave wallet address is: ", walletAddress);

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
        owner: walletAddress,
        crons: {
            lastExecuted: 0,
            crons: {},
        },
        contracts: {
            dfinity: options.contractTxId_II,
            ethereum: options.contractTxId_ETH,
        },
    };

    const warp = WarpFactory.forMainnet();

    try {
        const res = await warp.deployFromSourceTx({
            wallet: _wallet,
            initState: JSON.stringify(initialState),
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
        const db = require("../src/db");
        await db.setSchema(schema, "paymasters");
        console.log("setSchema complete!");
        await db.setRules(
            rules(process.env.ADMIN_ETH_ADDRESS as string),
            "paymasters"
        );
        console.log("setRules complete!");
        return;
    }

    console.log("an error occured while setting up arweave contracts.");
};

init();
