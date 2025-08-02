'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import BlankPage from "./ui/page/blankPage";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useConnectModal } from '@xellar/kit';

import Hero from './ui/homePageComponents/hero'
import About from './ui/homePageComponents/about'
import HomeSwiper from './ui/homePageComponents/homeSwiper'



export default function page() {
  const { isConnected, connectors, address } = useAuth();

  useEffect(() => {
    var lastPath = localStorage.getItem('lastPath') || "walletInventory/items";
    if (isConnected) {
      redirect(lastPath)
    }
  }, [isConnected])


  const metaMaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  return (
    <div className="relative w-full h-full">
      {
        !address && (
          <>
            <Hero />
            <About />
            {/* <HomeSwiper /> */}
          </>
        )
      }
    </div>
  )
}