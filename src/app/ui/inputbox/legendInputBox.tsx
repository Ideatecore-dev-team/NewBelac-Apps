import React from "react";
import BaseTextbox, { BaseTextboxProps } from "./baseTextbox";
import BaseSelect, { BaseSelectProps } from "./baseSelect";

type LegendPosition = "top" | "left";
type TypeBox = "input" | "select";

interface LegendTextboxProps extends BaseTextboxProps, BaseSelectProps {
    legendText: React.ReactNode;
    legendPosition?: LegendPosition;
    typeBox?: TypeBox
}

const TailwindTextbox: React.FC<LegendTextboxProps> = ({
    value,
    onChangeInput,
    onChangeSelect,
    placeholder,
    readOnly = false,
    disabled = false,
    type = "text",
    size = "M",
    color = "Netral",
    withoutOutline = false,
    legendText,
    legendPosition = "top",
    typeBox = "input",
    options = []
}) => {
    return (
        <div className={`w-full ${legendPosition === "top" ? 'flex flex-col space-y-2' : 'flex items-center space-x-4'}`}>
            <label className={`
                ${legendPosition === "left" ? 'min-w-[120px] text-right' : 'text-base font-semibold'}
            `}>
                {legendText}
            </label>
            {
                typeBox == "input" && (
                    <BaseTextbox
                        value={value}
                        onChangeInput={onChangeInput}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        disabled={disabled}
                        type={type}
                        size={size}
                        color={color}
                        withoutOutline={withoutOutline}
                    />
                )
            }
            {
                typeBox == "select" && (
                    <BaseSelect
                        value={value}
                        onChangeSelect={onChangeSelect}
                        options={options}
                        placeholder="Pilih kota Anda"
                        size="M"
                        color="Netral"
                    />
                )
            }
        </div>
    )
}

export default TailwindTextbox;