import React from 'react';
import BaseButton, { BaseButtonProps } from './baseButton';

interface TextButton extends BaseButtonProps {
    label: string
}

const TextButton: React.FC<TextButton> = ({
    label,
    onClick,
    withoutOutline,
    size
}) => {
    return (
        <>
            <BaseButton size={size} onClick={onClick} withoutOutline={withoutOutline} >
                <div className="justify-start text-white text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-tight tracking-wide">{label}</div>
            </BaseButton>
            {/* <button type="button" className="hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors h-14 p-4 bg-transparent rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-start items-center gap-4" onClick={onClick}>
                <div className="flex justify-center items-center gap-2.5">
                </div>
            </button> */}
        </>
    )
}

export default TextButton;