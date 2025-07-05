'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function NormalButtonComponents() {
    const { address, status } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()

    const metaMaskConnector = connectors.find(
        (connector) => connector.name === "MetaMask"
    );

    if (status === 'connected') {
        return (
            <button
                onClick={() => disconnect()}
                type="button"
                className="flex h-[48px] py-[12px] px-[16px] items-center gap-[10px] rounded-[6px] border border-[#2C2C2C] bg-[#D32F2F] hover:bg-[#B71C1C] transition-colors" // Warna diubah untuk menandakan aksi disconnect
            >
                <h1 className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                    DISCONNECT
                </h1>
                {/* Opsional: Tampilkan potongan alamat yang terhubung */}
                <span className="text-gray-300 text-sm font-mono">
                    ({address.slice(0, 6)}...{address.slice(-4)})
                </span>
            </button>
        )
    }

    return (
        <button
            onClick={() => metaMaskConnector && connect({ connector: metaMaskConnector })}
            disabled={!metaMaskConnector} // Tombol akan nonaktif jika MetaMask tidak ditemukan
            type="button"
            className="flex h-[48px] py-[12px] px-[16px] items-center gap-[16px] rounded-[6px] border border-[#2C2C2C] bg-[#1C1C1C] hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >

            <h1 className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                {metaMaskConnector ? 'CONNECT' : 'METAMASK NOT FOUND'}
            </h1>
        </button>
    )
}