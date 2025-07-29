'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import BlankPage from "./ui/page/blankPage";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function page() {
  const { status, connectors, connect } = useAuth();

  useEffect(() => {
    if (status === 'connected') {
      redirect('/walletInventory/collections')
    }
  }, [status])

  const metaMaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  return (
    <div className="relative w-full h-full">
      <BlankPage
        title="welcome to project: realmark"
        subtitle="Start authenticating your physical product"
        buttonLabel={metaMaskConnector ? 'CONNECT WALLET' : 'METAMASK NOT FOUND'}
        onClick={() => metaMaskConnector && connect({ connector: metaMaskConnector })}
        disabled={!metaMaskConnector}
      />
    </div>
  )
}