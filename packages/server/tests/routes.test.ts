import appRouter from "../src/trpc/router";
import {TRPCError} from "@trpc/server";
import {IronSession, WeaveDBUserObject} from "iron-session";
import {Context, createContext} from "../src/trpc/context";
import {getMockReq, getMockRes} from "@jest-mock/express";
import db from "../src/db";
import ArLocal from "arlocal";
import {SiweMessage} from "siwe";
import {Wallet} from "ethers";
import {expectTypeOf} from "expect-type";

const {applySession} = require("./session.mock.ts");

describe("test routes", () => {
    jest.useFakeTimers();
    jest.setTimeout(60000);

    let ctx: Context;
    let session: IronSession;
    let dbInstance: any;
    let arlocal: ArLocal;

    beforeAll(async () => {
        const _res: {session?: IronSession} = {};

        await applySession(_res, undefined, {cookieName: "test"});

        if (_res.session) {
            session = {
                ..._res.session,
                nonce: undefined,
                issuedAt: undefined,
                expirationTime: undefined,
                siwe: undefined,
                weavedbUser: undefined,
            };
        } else {
            throw new Error("No session after apply session");
        }

        const req = getMockReq({
            session,
        });
        const {res} = getMockRes();

        arlocal = new ArLocal(1820, false);
        await arlocal.start();

        dbInstance = db("localhost");

        ctx = createContext({req, res}, dbInstance);
    });

    afterAll(async () => {
        await arlocal.stop();
    });

    describe("test sign in with ethereum", () => {
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
            const setupSiwe = await caller.siwe.siweNonce();
            const message = _message(setupSiwe, signer.address);
            const hash = message.prepareMessage();
            const signature = await signer.signMessage(hash);
            const response = await caller.siwe.siweVerify({message, signature});
            expect(response).toMatchObject({ok: true});
            expect(session.siwe?.address).toBe(signer.address);
        });
        test("session is updated with user weavedb identity after connection", async () => {
            const caller = appRouter.createCaller(ctx);
            const setupSiwe = await caller.siwe.siweNonce();
            const message = _message(setupSiwe, signer.address);
            const hash = message.prepareMessage();
            const signature = await signer.signMessage(hash);
            const response = await caller.siwe.siweVerify({message, signature});
            expect(response).toMatchObject({ok: true});

            expect(session.weavedbUser?.wallet).toBe(signer.address);
            expect(session.weavedbUser?.wallet).toBe(session.weavedbUser?.identity?.linked_address);
            expectTypeOf(session.weavedbUser!).toEqualTypeOf<WeaveDBUserObject>();
        });
    });

    describe("test paymasters submission", () => {
        test("user cannot apply if wallet is not connected", async () => {});
        test("user cannot apply without providing the required information", async () => {});
        test("user can apply if wallet is connected", async () => {});
        test("user applications are saved in db after application", async () => {});
        test("user session identity is linked to application in db", async () => {});
    });
});
