import {schema} from "../../weavedb/schema";
import {rules} from "../../weavedb/rules";

/// this mock is just for the test to pass as i cant test against warp mainnet.
/// also this is a quick approach and does not determine a real arweave db scenario.
class MockWeaveDB {
    private static instance: MockWeaveDB;

    private db: {[key: string]: string | object | number | undefined | []};

    private schema = schema;
    private rules = rules("");

    private constructor() {
        this.db = {
            identities: {},
        };
        for (let collection in this.schema.properties) {
            collection = "string";
        }
    }

    static getOrCreateDB(): MockWeaveDB {
        if (!MockWeaveDB.instance) {
            MockWeaveDB.instance = new MockWeaveDB();
        }
        return MockWeaveDB.instance;
    }

    add(data: typeof schema.properties, collection: string, ...opts: any) {
        this.db[collection]
            ? (this.db[collection] as [typeof schema.properties]).push(data)
            : (this.db[collection] = [data]);
        return this.db[collection];
    }

    set() {}

    get(collection: string, ...opts: any) {
        return this.db[collection];
    }

    cget(collection: string, ...opts: any) {
        return this.db[collection];
    }

    delete(where: {}, collection: string) {}

    update(where: {}, collection: string) {}

    createTempAddress(address: string) {
        // this is a random generted address.
        (this.db as {identities: {[key: string]: {}}}).identities[address] = {
            identity: {
                privateKey: "0xa9c5dea3bc1ef46f79700807337ec14ce528b4e7377069d5c7c8fd1cccdd4b39",
                publicKey:
                    "6e31be622b05692a2670fd40b32dc567efd7f6d6046be71ad839e472244b2bb3ab950085c6651bcff00be65a66e216c033d892f482b416e0653e3a70b2b03575",
                address: "0xd44924cAE346f91894a46D9B71446E04420c5712",
                linked_address: address,
            },
        };
        return (this.db as {identities: {[key: string]: {}}}).identities[address];
    }
    getLinkedAddress(address?: string) {
        type Identity = {
            identities: {
                [key: string]: {
                    identity: {
                        linked_address: string;
                    };
                };
            };
        };
        return address
            ? (this.db as Identity).identities[address]?.identity.linked_address
            : (this.db as Identity).identities[
                  Object.keys((this.db as Identity).identities)[
                      Object.keys((this.db as Identity).identities).length - 1
                  ]
              ].identity.linked_address;
    }

    signer() {
        return "0xd44924cAE346f91894a46D9B71446E04420c5712";
    }

    ts() {
        return Date.now();
    }
}

const applyDB = jest.fn().mockImplementation((req) => {
    const store = MockWeaveDB.getOrCreateDB();
    const db = {
        add: store.add.bind(store),
        get: store.get.bind(store),
        cget: store.cget.bind(store),
        delete: store.delete,
        update: store.update.bind(store),
        createTempAddress: store.createTempAddress.bind(store),
        getLinkedAddress: store.getLinkedAddress.bind(store),
        signer: store.signer,
        ts: store.ts,
    };

    req.db = db;
});

export default {MockWeaveDB};
module.exports = {
    applyDB,
    withWeaveDB: jest.fn().mockImplementation((withWeaveDBHandler) => {
        return jest.fn().mockImplementation((...args) => {
            const handlerType = args[0] && args[1] ? "api" : "ssr";
            const req = handlerType === "api" ? args[0] : args[0].req;
            const res = handlerType === "api" ? args[1] : args[0].res;

            applyDB(req, res);

            return withWeaveDBHandler(...args);
        });
    }),
};
