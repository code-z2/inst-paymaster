import {inferAsyncReturnType} from "@trpc/server";
import {CreateExpressContextOptions} from "@trpc/server/adapters/express";
import db from "../db";

let dbInstance: any;

const createContext = ({req, res}: CreateExpressContextOptions, _db?: any) => {
    // for every hit to this API, this condition will run 0(1)^n
    // vs just setting dbInstance = db() 0(1)
    // just to make the test pass.
    // hopefully someone can help
    if (!dbInstance) {
        _db ? (dbInstance = _db) : (dbInstance = db());
    }
    return {
        req,
        res,
        db: dbInstance,
    };
};
type Context = inferAsyncReturnType<typeof createContext>;

export {createContext, Context};
