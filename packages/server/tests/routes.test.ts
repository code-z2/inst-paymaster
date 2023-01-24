import appRouter from "../src/trpc/router";
import {TRPCError} from "@trpc/server";
import {IronSession, WeaveDBUserObject} from "iron-session";
import {Context, createContext} from "../src/trpc/context";
import {getMockReq, getMockRes} from "@jest-mock/express";
import {SiweMessage} from "siwe";
import {Wallet} from "ethers";
import {expectTypeOf} from "expect-type";
import db from "../src/db";

const {applySession} = require("./mocks/session.ts");
const {applyDB} = require("./mocks/db.ts");

describe("test routes", () => {
    jest.useFakeTimers();

    let ctx: Context;
    let session: IronSession;
    let dbInstance: any;

    const _message = (data: {[key: string]: string}, address: string) => {
        const message = new SiweMessage({
            domain: "www.test.com",
            address,
            statement: "Sign in with Ethereum to the app.",
            uri: "https://test.com",
            version: "1",
            chainId: 1,
            expirationTime: data?.expirationTime,
            issuedAt: data?.issuedAt,
            nonce: data?.nonce,
        });
        return message;
    };

    const signIn = async (caller: any, signer: Wallet) => {
        const setupSiwe = await caller.siwe.siweNonce();
        const message = _message(setupSiwe, signer.address);
        const hash = message.prepareMessage();
        const signature = await signer.signMessage(hash);
        const response = await caller.siwe.siweVerify({message, signature});
        return response;
    };

    beforeAll(async () => {
        const _res: {session?: IronSession} = {};
        const _db: {db?: any} = {};

        await applySession(_res, undefined, {cookieName: "test"});
        await applyDB(_db, undefined);

        const throwErr = (errorMsg: string) => {
            throw new Error(errorMsg);
        };

        _res.session ? (session = _res.session) : throwErr("no session after apply session");

        _db.db ? (dbInstance = _db.db) : throwErr("no instance after aplly db");

        const req = getMockReq({
            session,
        });
        const {res} = getMockRes();

        ctx = createContext({req, res}, dbInstance);
    });

    describe("test sign in with ethereum", () => {
        let signer: Wallet;

        beforeEach(() => {
            session.destroy();
            signer = Wallet.createRandom();
        });
        test("session is setup with generated nonce to await for verification", async () => {
            const caller = appRouter.createCaller(ctx);
            const setupSiwe = await caller.siwe.siweNonce();
            expect(setupSiwe.nonce).toBe(session.nonce);
        });
        test("session details cannot be accessed if wallet not connected", async () => {
            const caller = appRouter.createCaller(ctx);
            try {
                await caller.siwe.siweDetails();
            } catch (error) {
                expect(error).toStrictEqual(new TRPCError({code: "UNAUTHORIZED"}));
            }
        });
        test("session  cannot be destroyed if wallet not connected", async () => {
            const caller = appRouter.createCaller(ctx);
            try {
                await caller.siwe.siweLogout();
            } catch (error) {
                expect(error).toStrictEqual(new TRPCError({code: "UNAUTHORIZED"}));
            }
        });
        test("session is updated with user siwe details after connection", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});
            expect(session.siwe?.address).toBe(signer.address);
        });
        test("session is updated with user weavedb identity after connection", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});

            expect(session.weavedbUser?.wallet).toBe(signer.address);
            expect(session.weavedbUser?.wallet).toBe(session.weavedbUser?.identity?.linked_address);
            expectTypeOf(session.weavedbUser!).toEqualTypeOf<WeaveDBUserObject>();
        });
        test("session can retrieve siwe details if user is connected", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});
            const siweDetails = await caller.siwe.siweDetails();
            expect(siweDetails).toEqual(
                expect.objectContaining({
                    address: signer.address,
                    nonce: session.nonce,
                    issuedAt: session.issuedAt,
                    expires: session.expirationTime,
                })
            );
        });
        test("session can be logged out if user is connected", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});
            const loggedOut = await caller.siwe.siweLogout();
            expect(loggedOut).toMatchObject({ok: true});
        });
        test("session is destroyed after logging out", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});
            const loggedOut = await caller.siwe.siweLogout();
            expect(loggedOut).toMatchObject({ok: true});
            expect(session.siwe).toEqual(undefined);
        });
    });

    describe("test paymasters submission", () => {
        let signer: Wallet;
        let data: {name: string; user_address: string; contract_address: string; metadata: string};

        beforeEach(() => {
            session.destroy();
            signer = Wallet.createRandom();
            data = {
                name: "zksync",
                user_address: "0xd44924cAE346f91894a46D9B71446E04420c5712",
                contract_address: "0xd44924cAE346f91894a46D9B71446E04420c5712",
                metadata: "bafyhash",
            };
        });

        test("user cannot apply if wallet is not connected", async () => {
            const caller = appRouter.createCaller(ctx);
            try {
                await caller.apply(data);
            } catch (error) {
                expect(error).toStrictEqual(new TRPCError({code: "UNAUTHORIZED"}));
            }
        });
        test("user can apply if wallet is connected", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});

            const dbresponse = await caller.apply(data);

            expect(dbresponse).toMatchObject({ok: true});

            const dbdata: [{}] = await dbInstance.get("paymasters");

            expect(dbdata.pop()).toEqual(expect.objectContaining(data));
        });

        test("user cannot apply without providing the right information", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});

            data = {
                name: "wrong",
                user_address: "wrong",
                contract_address: "wrong",
                metadata: "wrong",
            };

            try {
                await caller.apply(data);
            } catch (error: any) {
                expect(error?.code).toEqual(new TRPCError({code: "BAD_REQUEST"}).code);
            }
        });
        test("user applications are saved in db after application", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});

            const dbresponse = await caller.apply(data);

            expect(dbresponse).toMatchObject({ok: true});

            const dbdata: [{}] = await dbInstance.get("paymasters");

            expect(dbdata.length).toBeGreaterThan(0);
        });
        test("user session identity is linked to application in db", async () => {
            const caller = appRouter.createCaller(ctx);
            const response = await signIn(caller, signer);
            expect(response).toMatchObject({ok: true});

            const dbresponse = await caller.apply(data);

            expect(dbresponse).toMatchObject({ok: true});

            const linked = await dbInstance.getLinkedAddress();

            expect(linked).toBe(session.weavedbUser?.identity.linked_address);
        });
    });
    test("test cannot retrieve paymasters list", async () => {
        const caller = appRouter.createCaller(ctx);
        const paymasters = await caller.paymasters.all({});
        expect(paymasters).toMatchObject({ok: false});
    });
});
