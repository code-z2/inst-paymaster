import { utils, EIP712Signer, types, Wallet, Provider } from "zksync-web3";
import { ethers } from "ethers";

export default async function send(
  owner: string, // eipsigner
  account: string, // contract account
  to: string, // reciever
  amount: string, // eth in small number
  paymaster = "" // payamaster input
) {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  const signer = new Wallet(owner).connect(provider);

  console.log("step 1 provider is set");

  const gasPrice = await provider.getGasPrice();
  console.log("step 2 gass limit and price is set", gasPrice);

  const aaTx: ethers.providers.TransactionRequest = {
    to: to,
    from: account,
    gasPrice: gasPrice,
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(account),
    data: "0x00",
    type: 113,
    customData: {
      // Note, that we are using the `DEFAULT_ERGS_PER_PUBDATA_LIMIT`
      ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,
    value: ethers.utils.parseEther(amount),
  };

  const dynamicLimits = await provider.estimateGas(aaTx); // dynamic
  aaTx.gasLimit = dynamicLimits;

  console.log(
    "step 3 transaction is updated",
    `actual gas limit is ${dynamicLimits}`,
    aaTx
  );

  const signedTxHash = EIP712Signer.getSignedDigest(aaTx);
  console.log("step 4 transaction is signed");

  const signature = ethers.utils.joinSignature(
    signer._signingKey().signDigest(signedTxHash)
  );

  aaTx.customData = {
    ...aaTx.customData,
    customSignature: signature,
  };

  console.log("step 5 signature appended to transaction");

  const sentTx = await provider.sendTransaction(utils.serialize(aaTx));
  await sentTx.wait();

  return "success";
}
