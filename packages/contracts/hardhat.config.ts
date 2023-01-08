import "@matterlabs/hardhat-zksync-toolbox"
import fs from "fs"
import "hardhat-preprocessor"

function getRemappings() {
    return fs
        .readFileSync("remappings.txt", "utf8")
        .split("\n")
        .filter(Boolean) // remove empty lines
        .map((line) => line.trim().split("="))
}

module.exports = {
    zksolc: {
        version: "1.2.2",
        compilerSource: "binary", // binary or docker
        settings: {
            experimental: {
                dockerImage: "matterlabs/zksolc", // required for compilerSource: "docker"
                tag: "latest", // required for compilerSource: "docker"
            },
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            zksync: true, // enables zksync in hardhat local network
        },
        zkTestnet: {
            url: "https://zksync2-testnet.zksync.dev", // URL of the zkSync network RPC
            ethNetwork: "goerli", // Can also be the RPC URL of the Ethereum network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
            zksync: true,
        },
    },
    solidity: {
        version: "0.8.13",
    },
    paths: {
        sources: "./src",
        cache: "./cache_hardhat",
    },
    preprocess: {
        eachLine: (hre: any) => ({
            transform: (line: string) => {
                if (line.match(/^\s*import /i)) {
                    for (const [from, to] of getRemappings()) {
                        if (line.includes(from)) {
                            line = line.replace(from, to)
                            break
                        }
                    }
                }
                return line
            },
        }),
    },
}
