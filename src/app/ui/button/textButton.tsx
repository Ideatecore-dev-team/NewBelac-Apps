import React from 'react';
import BaseButton, { BaseButtonProps } from './baseButton';

const SizeClasses = {
    L: 'text-xl font-semibold leading-tight tracking-wide p-[16px]',
    M: 'text-base font-semibold leading-tight tracking-wide px-[16px] py-[12px]',
    S: 'text-sm font-semibold leading-tight tracking-wide px-[16px] py-[8px]',
    XS: 'text-sm font-medium leading-tight tracking-wide px-[12px] py-[8px]',
}
interface TextButtonProps extends BaseButtonProps {
    label: string,
}

const TextButton: React.FC<TextButtonProps> = ({
    label,
    onClick,
    withoutOutline,
    size = "M",
    color
}) => {
    return (
        <>
            <BaseButton color={color} onClick={onClick} withoutOutline={withoutOutline} >
                <div className={`${SizeClasses[size]} justify-start font-['D-DIN-PRO'] leading-tight tracking-wide`}>{label}</div>
            </BaseButton>
        </>
    )
}

export default TextButton;