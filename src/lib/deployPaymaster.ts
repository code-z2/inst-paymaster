import { utils, EIP712Signer, types, Wallet, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { contracts } from "./constants";
import paymasterABI from "./abis/paymasterFactoryABI.json";

export default async function deploy(
  owner: string, // eipsigner
  account: string, // contract account
  metadata: string,
  params: any
) {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  const signer = new Wallet(owner).connect(provider);

  console.log("step 1 provider is set");

  const paymasterFactory = new ethers.Contract(
    contracts.SPaymasterFactoryAddress,
    paymasterABI,
    signer
  );

  console.log("step 2 payMasterFactory");

  // For the simplicity of the tutorial, we will use zero hash + eip signer as salt
  const zero = ethers.constants.HashZero;
  const salt = ethers.utils.keccak256(
    ethers.utils.concat([zero, signer.address])
  );

  console.log("step 3 salt");

  let aaTx = await paymasterFactory.populateTransaction.deployPaymaster(
    salt,
    signer.address,
    ethers.utils.toUtf8Bytes(metadata),
    params.maxNonce,
    params.useCustomToken,
    params.tokenAddress,
    params.amount,
    params.validationAddress
  );
  console.log("step 4 aatx", aaTx);

  const gasLimit = await provider.estimateGas(aaTx); // explicitly: ethers.BigNumber.from("0x9972e0");
  const gasPrice = await provider.getGasPrice();
  console.log("step 5 gass limit and price is set", gasLimit, gasPrice);

  aaTx = {
    ...aaTx,
    from: account,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(account),
    type: 113,
    customData: {
      // Note, that we are using the `DEFAULT_ERGS_PER_PUBDATA_LIMIT`
      ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,
    value: ethers.BigNumber.from(0),
  };

  console.log("step 6 transaction is updated");

  const signedTxHash = EIP712Signer.getSignedDigest(aaTx);
  console.log("step 7 transaction is signed");

  const signature = ethers.utils.joinSignature(
    signer._signingKey().signDigest(signedTxHash)
  );
  console.log("step 8 EIP712 signature");

  console.log(signature.length);

  aaTx.customData = {
    ...aaTx.customData,
    customSignature: signature,
  };

  console.log("step 9 signature appended to transaction");

  const sentTx = await provider.sendTransaction(utils.serialize(aaTx));
  await sentTx.wait();

  const abiCoder = new ethers.utils.AbiCoder();

  const pAddress = utils.create2Address(
    contracts.SPaymasterFactoryAddress,
    await paymasterFactory.BytecodeHash(),
    salt,
    abiCoder.encode(
      ["address", "uint64", "bool", "address", "uint192", "address"],
      [
        signer.address,
        params.maxNonce,
        params.useCustomToken,
        params.tokenAddress,
        params.amount,
        params.validationAddress,
      ]
    )
  );
  console.log("step 10  successfull", pAddress);
  return pAddress;
}
