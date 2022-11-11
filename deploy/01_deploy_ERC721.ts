import { Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

export default async function (hre: HardhatRuntimeEnvironment) {
  const PRIVATE_KEY: any = process.env.PIVATE_KEY;
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);
  const ERC721Artifact = await deployer.loadArtifact("InstPayToken");

  const factory = await deployer.deploy(ERC721Artifact, [
    "InstPayToken",
    "IPT",
  ]);

  console.log(`ERC721 token address: ${factory.address}`);
}
