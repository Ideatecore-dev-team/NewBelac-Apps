// components/DropdownNavbarComponents.tsx

import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';


interface DropdownNavbarProps {
    isOpen: boolean;
    onEditProfile: () => void;
    onLogout: () => void;
}

const DropdownNavbarComponents: React.FC<DropdownNavbarProps> = ({
    isOpen,
    onEditProfile,
    onLogout,
}) => {
    return (
        <div
            className={`absolute right-0 mt-2 transition-all duration-300 ease-in-out ${isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
        >
            <div className="dropdownNavbarComponents absolute flex flex-col right-0 mt-[12px] w-[190px] p-[6px] gap-[4px] bg-[#1C1C1C] border border-[#2C2C2C] rounded-[6px] shadow-lg z-20">
                {/* Edit Profile */}
                <div
                    onClick={onEditProfile}
                    className="flex h-[40px] py-[8px] px-[16px] items-center gap-[16px] self-stretch w-full rounded-[4px] hover:bg-[#2C2C2C] transition-colors cursor-pointer"
                >
                    <Image
                        priority
                        height={20}
                        width={20}
                        src="/icons/edit-profile.svg"
                        alt="Edit Profile"
                    />
                    <div className="text-container flex justify-start items-center w-[70px]">
                        <p className="text-white text-[12px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                            Edit Profile
                        </p>
                    </div>
                </div>

                {/* Collections */}
                <Link href="/walletInventory/collections" legacyBehavior>
                    <a className="flex h-[40px] py-[8px] px-[16px] items-center gap-[16px] self-stretch w-full rounded-[4px] hover:bg-[#2C1C1C] transition-colors cursor-pointer">
                        <Image
                            priority
                            height={20}
                            width={20}
                            src="/icons/inventory.svg"
                            alt="Inventory"
                        />
                        <div className="text-container flex justify-start items-center w-[70px]">
                            <p className="text-white text-[12px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                                Inventory
                            </p>
                        </div>
                    </a>
                </Link>

                {/* Logout */}
                <div
                    onClick={onLogout}
                    className="flex h-[40px] py-[8px] px-[16px] items-center gap-[16px] self-stretch w-full rounded-[4px] hover:bg-[#2C1C1C] transition-colors cursor-pointer"
                >
                    <Image
                        priority
                        height={20}
                        width={20}
                        src="/icons/logout.svg"
                        alt="Logout"
                    />
                    <div className="text-container flex justify-start items-start w-[70px]">
                        <p className="text-white text-[12px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownNavbarComponents;