import React from 'react';

type SizeVariant = "L" | "M" | "S" | "XS";
export type ColorVariant = "Netral" | "Alert";

const ColorClasses = {
    Netral: 'text-white hover:bg-[#2C2C2C]',
    Alert: 'text-red-400 hover:bg-[#fdd3e5]',
};

export interface BaseButtonProps {
    onClick?: () => void,
    children?: React.ReactNode,
    withoutOutline?: boolean,
    size?: SizeVariant,
    color?: ColorVariant,
    disabled?: boolean,
    fullWidth?: boolean
}

const BaseButton: React.FC<BaseButtonProps> = ({
    onClick,
    children,
    withoutOutline = false,
    color = "Netral",
    disabled = false,
    fullWidth = false
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
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${ColorClasses[color]}
                ${withoutOutline ? "" : "outline outline-offset-[-1px] outline-[#2C2C2C]"}
                flex
                justify-center
                items-center
                cursor-pointer
            `} onClick={onClick} disabled={disabled}>
                <div className="flex justify-center items-center gap-2.5">
                    {children}
                </div>
            </button>
        </>
    )
}

export default BaseButton;
