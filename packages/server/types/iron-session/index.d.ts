import "iron-session";
import { SiweMessage } from "siwe";

declare module "iron-session" {
  interface IronSessionData {
    nonce?: string;
    issuedAt?: string;
    expirationTime?: string;
    siwe?: SiweMessage;
  }
}
