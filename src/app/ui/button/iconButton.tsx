import React from 'react';
import Image from 'next/image';
import BaseButton, { BaseButtonProps } from './baseButton';

const SizeIconClasses = {
    L: 32,
    M: 20,
    S: 18,
    XS: 14,
}

const SizeWrapperClasses = {
    L: 'p-[16px]',
    M: 'p-[12px]',
    S: 'p-[4px]',
    XS: 'p-[2px]',
}
interface IconButtonProps extends BaseButtonProps {
    alt: string,
    icon: string
}

const IconTextButton: React.FC<IconButtonProps> = ({
    alt,
    icon,
    onClick,
    withoutOutline = false,
    size = "M"
}) => {
    return (
        <>
            <BaseButton onClick={onClick} withoutOutline={withoutOutline} >
                <div className={SizeWrapperClasses[size]}>
                    <Image
                        priority
                        height={SizeIconClasses[size]}
                        width={SizeIconClasses[size]}
                        src={icon}
                        alt={`${alt}-button`}
                    />
                </div>
            </BaseButton>
        </>
    )
}

export default IconTextButton;