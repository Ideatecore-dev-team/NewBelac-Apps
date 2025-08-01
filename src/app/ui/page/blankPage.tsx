'use client'

import React from 'react';
import { TextButton } from '../button';
import { BaseButtonProps } from '../button/baseButton';

interface BlackPageProps extends BaseButtonProps {
    title: string,
    subtitle: string,
    buttonLabel?: string
}

const BlankPage: React.FC<BlackPageProps> = ({
    title,
    subtitle,
    buttonLabel = "fill the button label",
    onClick,
    disabled = false
}) => {
    return (
        <>
            <div id='blank-page-container' className="w-full h-full self-stretch inline-flex flex-col justify-center items-center gap-2.5" >
                <div id='blank-page-wrapper' className="w-full flex flex-col justify-start items-center gap-8">
                    <div className="self-stretch flex flex-col justify-start items-center gap-4">
                        <div className="self-stretch text-center justify-start text-white text-2xl font-semibold font-['D-DIN-PRO'] uppercase leading-normal tracking-wide">{title}</div>
                        <div className="self-stretch text-center justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-none tracking-wide">{subtitle}</div>
                    </div>
                    {
                        buttonLabel !== "fill the button label" && (
                            <div className="inline-flex justify-start items-center gap-4">
                                <TextButton
                                    label={buttonLabel}
                                    onClick={onClick}
                                    size='M'
                                    disabled={disabled}
                                />
                            </div>
                        )
                    }
                </div>
            </div >

        </>
    )
}

export default BlankPage;