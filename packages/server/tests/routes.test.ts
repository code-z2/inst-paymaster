import appRouter from "../src/trpc/router";
import {TRPCError} from "@trpc/server";
import {IronSession} from "iron-session";
import {Context, createContext} from "../src/trpc/context";
import {getMockReq, getMockRes} from "@jest-mock/express";
import db from "../src/db";

const {applySession} = require("./session.mock.ts");

describe("test routes", () => {
    jest.useFakeTimers();
    jest.setTimeout(10000);

    let ctx: Context;
    let address = "0x70E2D5aA970d84780D81a2c4164b984Abaa94527";
    let session: IronSession;
    let dbInstance: any;

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

        dbInstance = db();

        ctx = createContext({req, res}, dbInstance);
    });

    describe("test sign in with ethereum", () => {
        beforeEach(() => {
            session.destroy();
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
            // generate message
            // generate temp wallet
            // sign with temp wallet
            // send to verify route
            // check that the return value corresponds with expected
            // check that address in session is same as temp generated wallet
        });
        test("session is updated with user weavedb identity after connection", async () => {
            // generate message
            // generate temp wallet
            // sign with temp wallet
            // send to verify route
            // check that the return value corresponds with expected
            // check that address in session is same as temp generated wallet
            // check that address and session wallet address is same as linked address
            // check that weavdbuser is instance of weavedbuser type
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
