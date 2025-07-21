import React from 'react';

type SizeVariant = "L" | "M" | "S" | "XS";
type ColorVariant = "Netral" | "Alert"

const SizeClasses = {
    L: 'text-xl font-semibold leading-tight tracking-wide p-[16px]',
    M: 'text-base font-semibold leading-tight tracking-wide px-[16px] py-[12px]',
    S: 'text-sm font-semibold leading-tight tracking-wide px-[16px] py-[8px]',
    XS: 'text-sm font-medium leading-tight tracking-wide px-[12px] py-[8px]',
}

const ColorClasses = {
    Netral: 'text-white hover:bg-[#2C2C2C]',
    Alert: 'text-red-400 hover:bg-[#fdd3e5]'
}

export interface BaseButtonProps {
    onClick: () => void,
    children?: React.ReactNode,
    withoutOutline?: boolean,
    size?: SizeVariant,
    color?: ColorVariant
}

const BaseButton: React.FC<BaseButtonProps> = ({
    onClick,
    children,
    withoutOutline = false,
    size = "M",
    color = "Netral"
}) => {
    return (
        <>
            <button type="button" className={`
                disabled:bg-[#333]
                disabled:cursor-not-allowed
                disabled:opacity-50
                transition-colors
                bg-transparent
                rounded-md
                h-fit
                ${ColorClasses[color]}
                ${SizeClasses[size]}
                ${withoutOutline ? "" : "outline outline-offset-[-1px] outline-[#2C2C2C]"}
                flex
                justify-start
                items-center
                cursor-pointer
            `} onClick={onClick}>
                <div className="flex justify-center items-center gap-2.5">
                    {children}
                </div>
            </button>
        </>
    )
}

export default BaseButton;