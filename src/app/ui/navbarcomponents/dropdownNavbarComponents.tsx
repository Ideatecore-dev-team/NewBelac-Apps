'use client'

import { useState } from 'react'
import { useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export default function DropDownNavbarComponents() {
    const { disconnect } = useDisconnect()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()

    return (
        <div className="absolute flex flex-col right-0 mt-[12px] w-[190px] p-[6px] gap-[4px] bg-[#1C1C1C] border border-[#2C2C2C] rounded-[6px] shadow-lg z-20">

            {/* Edit Profile */}
            <div className='flex h-[40px] py-[8px] px-[16px] items-center gap-[16px] self-stretch w-full rounded-[4px] hover:bg-[#2C2C2C] transition-colors cursor-pointer'>
                <Image
                    priority
                    height={20}
                    width={20}
                    src="/icons/edit-profile.svg"
                    alt="IDRX"
                />
                <div className='text-container flex justify-start items-center w-[70px]'>
                    <p className="text-white text-[12px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']"> Edit Profile </p>
                </div>
            </div>

            {/* Inventory */}
            <div onClick={() => router.push('/walletInventory/collections')} className='flex h-[40px] py-[8px] px-[16px] items-center gap-[16px] self-stretch w-full rounded-[4px] hover:bg-[#2C2C2C] transition-colors cursor-pointer'>
                <Image
                    priority
                    height={20}
                    width={20}
                    src="/icons/inventory.svg"
                    alt="IDRX"
                />
                <div className='text-container flex justify-start items-center w-[70px]'>
                    <p
                        className="text-white text-[12px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']"> Inventory </p>
                </div>
            </div>

            {/* Logout */}
            <div className='flex h-[40px] py-[8px] px-[16px] items-center gap-[16px] self-stretch w-full rounded-[4px] hover:bg-[#2C2C2C] transition-colors cursor-pointer'>
                <Image
                    priority
                    height={20}
                    width={20}
                    src="/icons/logout.svg"
                    alt="IDRX"
                />
                <div className='text-container flex justify-start items-start w-[70px]'>
                    <p className="text-white text-[12px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']" onClick={() => { disconnect(); setIsDropdownOpen(false); }}> Logout </p>
                </div>
            </div>

        </div>
    )
}