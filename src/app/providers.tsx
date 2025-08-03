"use client"
  
import React from "react";
import { type ReactNode, useState } from 'react'
import { WagmiProvider, Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";


import { mainnet, sepolia, liskSepolia } from "viem/chains"; 
import { WALLET_CONNECT_PROJECT_ID, XELLAR_APP_PROJECT_ID } from "@/constants";
import { AuthProvider } from "./contexts/AuthContext";


const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId : WALLET_CONNECT_PROJECT_ID,
  xellarAppId : XELLAR_APP_PROJECT_ID,
  xellarEnv: "sandbox",
  chains: [mainnet, sepolia, liskSepolia],
}) as Config;

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <XellarKitProvider theme={darkTheme}>{props.children}</XellarKitProvider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

