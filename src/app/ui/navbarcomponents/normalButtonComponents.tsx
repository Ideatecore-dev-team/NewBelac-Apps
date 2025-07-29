'use client'

import { useAuth } from '@/app/contexts/AuthContext';
import { ConnectButton } from '@xellar/kit';
import Link from 'next/link'; 


export default function NormalButtonComponents() {
    const { connectors, connect } = useAuth();

    return (
        // <div className="flex h-[48px] py-[12px] px-[16px] items-center gap-[16px] rounded-[6px] border border-[#2C2C2C] bg-[#1C1C1C] hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors">
        <div>

                <ConnectButton />
        </div>
    )
}