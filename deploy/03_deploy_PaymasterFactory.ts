import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
require("dotenv").config();

export default async function deployPaymasterFactory(
  hre: HardhatRuntimeEnvironment
) {
  const PRIVATE_KEY: any = process.env.PIVATE_KEY;
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);
  const factoryArtifact = await deployer.loadArtifact("SPaymasterFactory");
  const sArtifact = await deployer.loadArtifact("SPaymaster");

  // Getting the bytecodeHash of the account
  const bytecodeHash = utils.hashBytecode(sArtifact.bytecode);

  const factory = await deployer.deploy(
    factoryArtifact,
    [bytecodeHash],
    undefined,
    [
      // Since the factory requires the code of the sAccount to be available,
      // we should pass it here as well.
      sArtifact.bytecode,
    ]
  );

  console.log(`SPaymasterfactory address: ${factory.address}`);
}
