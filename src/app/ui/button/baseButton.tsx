import React from 'react';

type SizeVariant = "L" | "M" | "S" | "XS";
export type ColorVariant = "Netral" | "Alert";

const ColorClasses = {
  Netral: 'text-white hover:bg-[#2C2C2C]',
  Alert: 'text-red-400 hover:bg-[#fdd3e5]',
};

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children?: React.ReactNode;
  withoutOutline?: boolean;
  size?: SizeVariant;
  color?: ColorVariant;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  onClick,
  children,
  withoutOutline = false,
  color = "Netral",
  disabled = false,
  className = '',
  ...rest
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        transition-colors
        bg-transparent
        rounded-md
        h-fit
        w-fit
        flex
        justify-start
        items-center
        cursor-pointer
        ${ColorClasses[color]}
        ${disabled ? 'cursor-not-allowed opacity-50 bg-[#333]' : ''}
        ${withoutOutline ? '' : 'outline outline-offset-[-1px] outline-[#2C2C2C]'}
        ${className}
      `}
      {...rest}
    >
      <div className="flex justify-center items-center gap-2.5">
        {children}
      </div>
    </button>
  );
};

export default BaseButton;
