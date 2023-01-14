import "iron-session";
import {SiweMessage} from "siwe";

declare module "iron-session" {
    interface WeaveDBUserObject {
        wallet: string;
        identity: {
            privateKey: string;
            linked_address: string;
            tx: any;
            address: string;
        };
    }
    interface IronSessionData {
        nonce?: string;
        issuedAt?: string;
        expirationTime?: string;
        siwe?: SiweMessage;
        weavedbUser?: WeaveDBUserObject;
    }
}
