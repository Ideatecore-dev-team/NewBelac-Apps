import React from 'react';
import Image from 'next/image';
import BaseButton, { BaseButtonProps } from './baseButton';

interface IconButtonProps extends BaseButtonProps {
    alt: string,
    icon: string
}

const IconTextButton: React.FC<IconButtonProps> = ({
    alt,
    icon,
    onClick,
    withoutOutline = false,
    size
}) => {
    return (
        <>
            <BaseButton size={size} onClick={onClick} withoutOutline={withoutOutline} >
                <Image
                    priority
                    height={20}
                    width={20}
                    src={icon}
                    alt={`${alt}-button`}
                />
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