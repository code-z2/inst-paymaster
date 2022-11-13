import { utils, Web3Provider } from "zksync-web3";
import * as ethers from "ethers";
import { contracts } from "./constants";
import accountABI from "./abis/accountFactoryABI.json";

export default async function deploy(owner: string) {
  const provider = new Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const aaFactory = new ethers.Contract(
    contracts.SAccountFactoryAddress,
    accountABI,
    signer
  );

  // For the simplicity of the tutorial, we will use zero hash + owner EOA as salt
  const zero = ethers.constants.HashZero;
  const salt = ethers.utils.keccak256(ethers.utils.concat([zero, owner]));

  const tx = await aaFactory.deployAccount(salt, owner);
  tx.wait();

  // Getting the address of the deployed contract
  const abiCoder = new ethers.utils.AbiCoder();

  const sAddress = utils.create2Address(
    contracts.SAccountFactoryAddress,
    await aaFactory.BytecodeHash(),
    salt,
    abiCoder.encode(["address"], [owner])
  );

  console.log(`Deployed on address ${sAddress}`);
  return sAddress;
}
