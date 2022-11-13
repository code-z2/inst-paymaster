import { utils, Wallet, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { contracts } from "./constants";
import accountABI from "./abis/accountFactoryABI.json";

export default async function deploy() {
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  const wallet = new Wallet(PRIVATE_KEY as string).connect(provider);

  const aaFactory = new ethers.Contract(
    contracts.SAccountFactoryAddress,
    accountABI,
    wallet
  );

  // random EIP712 signer
  const signer = Wallet.createRandom();

  // For the simplicity of the tutorial, we will use zero hash + signer as salt
  const zero = ethers.constants.HashZero;
  const salt = ethers.utils.keccak256(
    ethers.utils.concat([zero, signer.address])
  );

  const tx = await aaFactory.deployAccount(salt, signer.address);
  tx.wait();

  // Getting the address of the deployed contract
  const abiCoder = new ethers.utils.AbiCoder();

  const sAddress = utils.create2Address(
    contracts.SAccountFactoryAddress,
    await aaFactory.BytecodeHash(),
    salt,
    abiCoder.encode(["address"], [signer.address])
  );

  console.log(`Deployed on address ${sAddress}`);
  return { EIP712Signer: signer.privateKey, account: sAddress };
}
