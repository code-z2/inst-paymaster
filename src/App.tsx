import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import SyncWallet from "./pages";

const zkSync: Chain = {
  id: 280,
  name: "zkSync alpha testnet",
  network: "zkSync",
  iconUrl: "https://icodrops.com/wp-content/uploads/2020/12/zkSync_logo.jpg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "zkETH",
  },
  rpcUrls: {
    default: "https://zksync2-testnet.zksync.dev",
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.zksync.io" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.goerli, zkSync],
  [
    jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Inst-Paymaster",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        modalSize="compact"
        chains={chains}
        // theme={{
        //   lightMode: lightTheme(),
        //   darkMode: darkTheme(),
        // }}
      >
        <QueryClientProvider client={queryClient}>
          <div className="h-screen flex justify-center items-center">
            <SyncWallet />
          </div>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
