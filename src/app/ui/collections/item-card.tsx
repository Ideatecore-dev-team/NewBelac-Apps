import Image from "next/image";
import React from "react";

export type FilterStatus = 'All' | 'Listed' | 'Not Listed';

export interface Item {
    id: number;
    label: any;
    price: any;
    items: any;
    image?: any; //biar nggak bug
    filterStatus: FilterStatus;
}

export interface ItemCardProps {
    id: number;
    label: any;
    price: any;
    items: any;
    image: string; //biar nggak bug
    filterStatus: FilterStatus;
    onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
    id,
    label,
    onClick,
    image = "/images/shoes.png",
    filterStatus
}) => (
    <div onClick={onClick} className="cursor-pointer items-card w-[295px] bg-Color-Grey-2 rounded-md border border-[#2C2C2C] bg-Color-Gray-2 inline-flex flex-col justify-start items-start overflow-hidden">
        <Image
            priority
            width={295}
            height={192}
            // sizes="(max-width: 295px)"
            src={image}
            alt={label}
            className="w-[295px] h-[192px] bg-Color-Grey-1 self-stretch"
            onError={(e) => {
                e.currentTarget.src = `https://placehold.co/295x192/151515/FFF?text=Error`;
            }}
        />
        <div className="self-stretch px-4 py-4 inline-flex justify-start items-start gap-7">
            <div className="flex-1 inline-flex flex-col justify-start items-center gap-4">
                <div className="self-stretch inline-flex justify-between items-center gap-4 w-full">
                    <h1 className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{label}</h1>
                    <div className="flex justify-start items-center gap-1.5">
                        <div className="p-1.5 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                            <h1 className="justify-start text-[#4dacff] text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">#{id}</h1>
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-9 inline-flex justify-start items-end gap-8">
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="inline-flex justify-start items-center gap-[5px]">
                            <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">{filterStatus}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ItemCard