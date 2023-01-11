import {inferAsyncReturnType} from "@trpc/server"
import {CreateExpressContextOptions} from "@trpc/server/adapters/express"
import db from "../db"

const createContext = ({req, res}: CreateExpressContextOptions) => ({
    req,
    res,
    db,
})
type Context = inferAsyncReturnType<typeof createContext>

export {createContext, Context}
