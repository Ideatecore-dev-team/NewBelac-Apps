// components/BaseSelect.tsx
import React from 'react';

type SizeVariant = "L" | "M" | "S" | "XS";
type ColorVariant = "Netral" | "Alert";

const SizeClasses = {
    L: 'px-4 py-3 text-lg',
    M: 'px-4 py-2.5 text-base',
    S: 'px-3 py-2 text-sm',
    XS: 'px-2.5 py-1.5 text-xs',
};

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface BaseSelectProps {
    options?: SelectOption[];
    value: string | number;
    onChangeSelect?: (event: React.ChangeEvent<| HTMLSelectElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    size?: SizeVariant;
    color?: ColorVariant;
    withoutOutline?: boolean;
    required?: boolean;
    requiredMsg?: string;
}

const BaseSelect: React.FC<BaseSelectProps> = ({
    options = [],
    value,
    onChangeSelect,
    placeholder,
    disabled = false,
    size = "M",
    color = "Netral",
    withoutOutline = false,
    required = false,
    requiredMsg = "You must select any option"
}) => {
    const textColorClasses =
        color === "Alert"
            ? "text-red-500 placeholder-red-300"
            : "text-white/70 placeholder-white/50";

    const borderColorClasses =
        color === "Alert"
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-[#2C2C2C] focus:ring-white focus:border-white";

    return (
        <div className="relative w-full">
            <div className="relative w-full">
                <select
                    value={value}
                    onChange={onChangeSelect}
                    disabled={disabled}
                    className={`
                    ${SizeClasses[size]}
                    ${textColorClasses}
                    ${borderColorClasses}
                    font-[500]
                    leading-4
                    tracking-[0.5px]
                    font-['D-DIN-PRO']
                    self-stretch
                    grow
                    shrink-0
                    basis-0
                    bg-[#1A1A1A] // Solid background for the select box
                    border
                    rounded-md
                    outline-none
                    transition-all
                    duration-200
                    ease-in-out
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${!withoutOutline ? 'focus:ring-1' : ''}
                    appearance-none
                    pr-10
                    cursor-pointer
                    w-full
                    & option {
                        background-color: #1A1A1A;
                        color: #FFFFFF;
                    }
                `}
                >
                    {placeholder && (
                        <option value="" disabled hidden>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Custom SVG dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2 text-white/70">
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            {!value && required && (
                <p className="text-red-400 text-sm mt-1">{requiredMsg}</p>
            )}
        </div>
    );
};

export default BaseSelect;
