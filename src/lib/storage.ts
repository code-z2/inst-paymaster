// import { SignatureLike } from "@ethersproject/bytes";
import { AES, SHA256, enc } from "crypto-js";
const SecureStorage = require("secure-web-storage");

export const browserStorage = (signature: string) =>
  new SecureStorage(localStorage, {
    hash: function hash(key: any) {
      key = SHA256(key, { signature });

      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      data = AES.encrypt(data, signature);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data: any) {
      data = AES.decrypt(data, signature);

      data = data.toString(enc.Utf8);

      return data;
    },
  });
