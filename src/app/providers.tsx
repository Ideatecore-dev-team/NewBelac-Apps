"use client"
  
import React from "react";
import { type ReactNode, useState } from 'react'
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";


import { mainnet, sepolia, liskSepolia } from "viem/chains"; 
import { WALLET_CONNECT_PROJECT_ID } from "@/constants";
import { AuthProvider } from "./contexts/AuthContext";


const walletConnectProjectId = WALLET_CONNECT_PROJECT_ID;
const xellarAppId = "653e320e-5d31-417d-9f25-8e37a69ecfb7";

const config = defaultConfig({
  appName: "Xellar",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  chains: [mainnet, sepolia, liskSepolia],
});

const queryClient = new QueryClient();

// Komponen ini tidak lagi menerima initialState
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

