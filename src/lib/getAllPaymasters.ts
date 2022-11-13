import { Provider } from "zksync-web3";
import { ethers } from "ethers";
import { contracts } from "./constants";
import paymasterStorageAbi from "./abis/paymasterStorage.json";
import { IMetadata } from "../components/PaymasterUI/Paymasters";

export async function paymasters(): Promise<IMetadata[] | undefined> {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");

  const metadata = async (cid: string, contract: string) => {
    const data = await fetch(
      `https://${cid}.ipfs.dweb.link/payamsterMetadata.json`,
      {
        method: "GET",
      }
    );
    //@ts-ignore
    const json = await data.json();
    const paymasterName = encodeURIComponent(json.name.trim());
    const imgUrl = `https://${json.logo}.ipfs.dweb.link/${paymasterName}`;
    json.logo = imgUrl;
    json.address = contract;
    return json;
  };

  const paymasterStorage = new ethers.Contract(
    contracts.PaymasterStorageContractAddress,
    paymasterStorageAbi,
    provider
  );

  const paymaster = await paymasterStorage.getAllPaymasters();

  const memo: IMetadata[] = await Promise.all(
    paymaster.map(async (el: any): Promise<IMetadata> => {
      return await metadata(
        ethers.utils.toUtf8String(el.metadata),
        el.contract_address
      );
    })
  );
  return memo;
}
