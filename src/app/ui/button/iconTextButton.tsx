import React from 'react';
import Image from 'next/image';
import BaseButton, { BaseButtonProps } from './baseButton';

const SizeClasses = {
    L: 'text-xl font-semibold leading-tight tracking-wide p-[16px]',
    M: 'text-base font-semibold leading-tight tracking-wide px-[16px] py-[12px]',
    S: 'text-sm font-semibold leading-tight tracking-wide px-[16px] py-[8px]',
    XS: 'text-sm font-medium leading-tight tracking-wide px-[12px] py-[8px]',
}

interface IconTextButtonProps extends BaseButtonProps {
    label: string,
    icon: string
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
    label,
    icon,
    onClick,
    withoutOutline = false,
    size = "M",
    color
}) => {
    return (
        <>
            <BaseButton color={color} onClick={onClick} withoutOutline={withoutOutline} >
                <Image
                    priority
                    height={20}
                    width={20}
                    src={icon}
                    alt={`${label}-button`}
                />
                <div className={`${SizeClasses[size]} justify-start font-['D-DIN-PRO'] leading-tight tracking-wide`}>{label}</div>
            </BaseButton>
            {/* <button type="button" className="hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors h-14 p-4 bg-transparent rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-start items-center gap-4" onClick={onClick}>
                <div className="flex justify-center items-center gap-2.5">
                    <div className="justify-start text-white text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-tight tracking-wide">{label}</div>
                </div>
            </button> */}
        </>
    )
}

export default IconTextButton;