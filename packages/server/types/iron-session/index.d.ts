import "iron-session"
import {SiweMessage} from "siwe"

interface WeaveDBUserObject {
    wallet: string
    identity: {
        privateKey: string
        linked_address: string
        tx: any
        address: string
    }
}

declare module "iron-session" {
    interface IronSessionData {
        nonce?: string
        issuedAt?: string
        expirationTime?: string
        siwe?: SiweMessage
        weavedbUser?: WeaveDBUserObject
    }
}
