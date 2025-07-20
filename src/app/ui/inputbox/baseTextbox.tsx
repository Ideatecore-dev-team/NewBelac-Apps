import React from 'react';

type SizeVariant = "L" | "M" | "S" | "XS";
type ColorVariant = "Netral" | "Alert";

const SizeClasses = {
    L: 'px-4 py-3 text-lg',
    M: 'px-4 py-2.5 text-base',
    S: 'px-3 py-2 text-sm',
    XS: 'px-2.5 py-1.5 text-xs',
};

export interface BaseTextboxProps {
    value: string | number;
    onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    type?: string;
    size?: SizeVariant;
    color?: ColorVariant;
    withoutOutline?: boolean;
}

const BaseTextbox: React.FC<BaseTextboxProps> = ({
    value,
    onChangeInput = () => ({}),
    placeholder,
    readOnly = false,
    disabled = false,
    type = "text",
    size = "M",
    color = "Netral",
    withoutOutline = false,
}) => {

    const textColorClasses =
        color === "Alert"
            ? "text-red-400 placeholder-red-300"
            : "text-white/70 placeholder-white/50";

    const borderColorClasses =
        color === "Alert"
            ? "border-red-400 focus:ring-red-400 focus:border-red-400"
            : "border-[#2C2C2C] focus:ring-white focus:border-white";

    return (
        <input
            type={type}
            value={value}
            onChange={onChangeInput}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            className={`
                ${SizeClasses[size]}
                ${textColorClasses}
                ${borderColorClasses}
                font-[400]
                leading-4
                tracking-[0.5px]
                font-['D-DIN-PRO']
                bg-transparent
                border
                rounded-md
                transition-all
                duration-200
                ease-in-out
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${!withoutOutline ? 'focus:ring-1' : ''} 
            `}
        />
    );
};

export default BaseTextbox;