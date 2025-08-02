'use client'

import Link from "next/link"
import { useAuth } from '../contexts/AuthContext'
import dynamic from "next/dynamic"

import Image from "next/image"

const MenusNavbarComponentsNoSSR = dynamic(() => import('./navbarComponents/menusNavbarComponents'), { ssr: false })
const NormalButtonComponentsNoSSR = dynamic(() => import('./navbarComponents/normalButtonComponents'), { ssr: false })

export default function Navbar() {
    const { status } = useAuth()

    return (
        <>
            <nav data-state="Default" className="navbarComponent flex py-[12px] px-[48px] flex-col items-center gap-[10px] self-stretch border border-[#2C2C2C] bg-[#1B1B1B]/60 backdrop-blur-[5px] sticky top-0 z-[100]">
                <div className="container flex max-w-[1240px] justify-between items-center self-stretch mx-auto">
                    <div className="div flex items-center gap-[32px]">
                        <Link href="/" className="logo-placeholder flex flex-row items-center cursor-pointer">
                            <Image
                                priority
                                width={127}
                                height={20}
                                alt="logo"
                                src="/images/Realmark-Logo.png"
                            />

                            {/* <h1 className=" text-[#FFF] text-[16px] font-bold leading-4 tracking-[0.5px]"> REALMARK </h1> */}
                        </Link>
                    </div>
                    {status === 'connected' && <MenusNavbarComponentsNoSSR />}
                    {status !== 'connected' && <NormalButtonComponentsNoSSR />}
                </div>
            </nav>
        </>
    )
}