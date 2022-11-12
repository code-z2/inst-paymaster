import { Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
require("dotenv").config();

export default async function deployERC20(hre: HardhatRuntimeEnvironment) {
  const PRIVATE_KEY: any = process.env.PIVATE_KEY;
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);
  const ERC20Artifact = await deployer.loadArtifact("MyERC20");

  const factory = await deployer.deploy(ERC20Artifact, [
    "InstPayToken",
    "IPT",
    18,
  ]);

  console.log(`ERC20 token address: ${factory.address}`);
}
