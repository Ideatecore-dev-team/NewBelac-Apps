'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import BlankPage from "./ui/page/blankPage";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useConnectModal } from '@xellar/kit';

export default function page() {
  const { status, connectors, connect } = useAuth();
  const { open: openConnectModal } = useConnectModal();

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
        buttonLabel={metaMaskConnector ? 'CONNECT WALLET' : 'WALLET NOT FOUND'}
        onClick={openConnectModal}
        disabled={!metaMaskConnector}
      />
    </div>
  )
}