'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'

import Link from "next/link"
import NormalButtonComponents from "./navbarcomponents/normalButtonComponents"
import MenusNavbarComponents from './navbarcomponents/menusNavbarComponents'

export default function Navbar() {
    const { status } = useAccount()
    const router = useRouter()

    return (
        <>
            <nav data-state="Default" className="navbarComponent flex py-[12px] px-[48px] flex-col items-center gap-[10px] self-stretch border border-[#2C2C2C] bg-[#1B1B1B]/60 backdrop-blur-[5px]">
                <div className="container flex max-w-[1240px] justify-between items-center self-stretch mx-auto">
                    <div className="div flex items-center gap-[32px]">
                        <div onClick={() => router.push('/')} className="logo-placeholder flex flex-col items-center">
                            <h1 className=" text-[#FFF] text-[16px] font-normal leading-4 tracking-[0.5px]">
                                PROJECT
                            </h1>
                            <h1 className=" text-[#FFF] text-[16px] font-bold leading-4 tracking-[0.5px]">
                                REALMARK
                            </h1>
                        </div>
                    </div>
                    {status === 'connected' && <MenusNavbarComponents />}
                    {status !== 'connected' && <NormalButtonComponents />}
                </div>
            </nav>
        </>
    )
}