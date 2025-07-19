import React from 'react';

type SizeVariant = "L" | "M" | "S" | "XS";

const SizeClasses = {
    L: 'p-[16px]',
    M: 'p-[12px]',
    S: 'p-[8px]',
    XS: 'p-[4x]',
}

export interface BaseButtonProps {
    onClick: () => void,
    children?: React.ReactNode,
    withoutOutline?: boolean,
    size?: SizeVariant
}

const BaseButton: React.FC<BaseButtonProps> = ({
    onClick,
    children,
    withoutOutline = false,
    size = "M"
}) => {
    return (
        <>
            <button type="button" className={`
                hover:bg-[#2C2C2C]
                disabled:bg-[#333]
                disabled:cursor-not-allowed
                disabled:opacity-50
                transition-colors
                bg-transparent
                rounded-md
                ${SizeClasses[size]}
                ${withoutOutline ? "" : "outline outline-offset-[-1px] outline-[#2C2C2C]"}
                flex
                justify-start
                items-center
                gap-4
            `} onClick={onClick}>
                <div className="flex justify-center items-center gap-2.5">
                    {children}
                </div>
            </button>
        </>
    )
}

export default BaseButton;