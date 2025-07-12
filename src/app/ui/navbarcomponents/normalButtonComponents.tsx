'use client'

import { useAuth } from '@/app/contexts/AuthContext'; 

export default function NormalButtonComponents() {
    const { connectors, connect } = useAuth();

    const metaMaskConnector = connectors.find(
        (connector) => connector.name === "MetaMask"
    );

    return (
        <button
            onClick={() => metaMaskConnector && connect({ connector: metaMaskConnector })}
            disabled={!metaMaskConnector}
            type="button"
            className="flex h-[48px] py-[12px] px-[16px] items-center gap-[16px] rounded-[6px] border border-[#2C2C2C] bg-[#1C1C1C] hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
            <h1 className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                {metaMaskConnector ? 'CONNECT' : 'METAMASK NOT FOUND'}
            </h1>
        </button>
    )
}