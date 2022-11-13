import { Provider } from "zksync-web3";
import { ethers } from "ethers";
import { contracts } from "./constants";
import paymasterStorageAbi from "./abis/paymasterStorage.json";
import { IMetadata } from "../components/PaymasterUI/Paymasters";

export async function paymasters(): Promise<IMetadata[] | undefined> {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");

  const metadata = async (cid: string, contract: string) => {
    const data = await fetch(
      `https://${cid}.ipfs.dweb.link/payamsterMetadata.json`
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

  const reducedResult = paymaster.reduce(
    async (memo: IMetadata[], element: any) => {
      const elMetadata = ethers.utils.toUtf8String(element.metadata);
      memo.push(await metadata(elMetadata, element.contract_address));
      return memo;
    },
    []
  );

  return reducedResult;
}
