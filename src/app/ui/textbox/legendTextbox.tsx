import React from "react";
import BaseTextbox, { BaseTextboxProps } from "./baseTextBox";

type LegendPosition = "top" | "left";

interface LegendTextboxProps extends BaseTextboxProps {
    legendText: React.ReactNode;
    legendPosition?: LegendPosition;
}

const TailwindTextbox: React.FC<LegendTextboxProps> = ({
    value,
    onChange,
    placeholder,
    readOnly = false,
    disabled = false,
    type = "text",
    size = "M",
    color = "Netral",
    withoutOutline = false,
    legendText,
    legendPosition = "top"
}) => {
    return (
        <div className={`w-full ${legendPosition === "top" ? 'flex flex-col space-y-2' : 'flex items-center space-x-4'}`}>
            <label className={`
                ${legendPosition === "left" ? 'min-w-[120px] text-right' : 'text-base font-semibold'}
            `}>
                {legendText}
            </label>
            <BaseTextbox
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                disabled={disabled}
                type={type}
                size={size}
                color={color}
                withoutOutline={withoutOutline}
            />
        </div>
    )
}

export default TailwindTextbox;