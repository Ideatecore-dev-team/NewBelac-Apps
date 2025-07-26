"use client";

import Image from "next/image";
import { useState, FC } from "react";


interface Collection {
    label: string;
    price: number;
    items: number;
    // image: string; //biar nggak bug
}

interface CollectionCardProps {
    data: Collection;
}


const CollectionCard: FC<CollectionCardProps> = ({ data }) => (
    <div className="flex flex-col gap-2 p-4 rounded-md border border-[#2C2C2C] bg-Color-Gray-2">
        {/* <Image 
            priority 
            height={200} 
            width={200} 
            src={data.image} 
            alt={data.label} 
            className="rounded-md object-cover w-full" 
            onError={(e) => { e.currentTarget.src = `https://placehold.co/200x200/151515/FFF?text=Error`; }}
        /> */}

        <Image
            priority
            height={200}
            width={200}
            src="/icons/IDRX.svg" //dummy doang
            alt={data.label}
            className="rounded-md object-cover w-full"
            onError={(e) => { e.currentTarget.src = `https://placehold.co/200x200/151515/FFF?text=Error`; }}
        />
        <h3 className="text-Color-White-1 font-bold">{data.label}</h3>
        <p className="text-Color-White-2/70">Price: {data.price} ETH</p>
        <p className="text-Color-White-2/70">Items: {data.items}</p>
    </div>
);

// Mendefinisikan tipe untuk status filter
type FilterStatus = 'All' | 'Listed' | 'Not Listed';

export default function Items() {
    // State untuk melacak filter status yang aktif (sekarang dengan tipe)
    const [activeStatus, setActiveStatus] = useState<FilterStatus>('All');

    const collectionsData: Collection[] = [
        { label: 'Nike Realmark', price: 10.1, items: 68, },
        { label: 'Nike Realmark', price: 10.1, items: 68, },
        { label: 'Nike Realmark', price: 10.1, items: 68, },
        { label: 'Nike Realmark', price: 10.1, items: 68, },
        { label: 'Nike Realmark', price: 10.1, items: 68, },
    ];

    const filterButtons: FilterStatus[] = ['All', 'Listed', 'Not Listed'];

    const baseButtonClasses = "h-8 px-3 py-2 rounded-md outline-1 outline-offset-[-1px] flex justify-start items-center gap-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#151515] focus:ring-[#4dacff]";

    const activeButtonClasses = "bg-gradient-to-b from-zinc-900 to-gray-800 shadow-[0px_4px_5px_0px_rgba(71,175,255,0.25)] outline-[#4dacff]";

    const inactiveButtonClasses = "bg-[#1c1c1c] outline-[#2c2c2c]";

    return (
        <div id="collection-page-container" className="flex flex-col justify-center items-center grow shrink-0 basis-0 self-stretch bg-[#151515] text-white">
            <div className="container flex max-w-[1240px] flex-col items-start gap-3 grow shrink-0 basis-0 self-stretch">
                <div id="collection-page-subtitle" className="text-gray-400 mt-2 mb-4 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Owned Items ({collectionsData.length})</div>
            </div>

            <div className="items-div flex max-w-[1240px] items-start gap-5 grow shrink-0 basis-0 self-stretch">
                {/* Kolom Filter */}
                <div className="filter-card flex w-[295px] px-4 pt-4 pb-6 flex-col items-start gap-[15px] rounded-md border border-[#2C2C2C] bg-[#1A1A1A]">
                    <h1 className="self-stretch justify-start text-white text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Filters</h1>

                    {/* Input Pencarian */}
                    <div className="small flex items-start self-stretch">
                        <div className="field flex w-[261px] h-[40px] p-3 items-center gap-2 rounded-md border border-[#2c2c2c] bg-black/45 flex-row">
                            <div className="flex">
                                <Image priority height={20} width={20} src="/icons/search.svg" alt="Search Icon" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by items"
                                className="flex grow shrink-0 basis-0 text-gray-400 text-sm font-medium font-['D-DIN-PRO'] leading-[140%] bg-transparent focus:outline-none placeholder-gray-500"
                            />
                        </div>
                    </div>

                    <Image priority height={2} width={263} src="/icons/horizontalVector.svg" alt="Divider" />

                    {/* Filter Status */}
                    <div className="self-stretch justify-start text-white text-sm font-semibold font-['D-DIN-PRO'] leading-tight">Status</div>
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                        {filterButtons.map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`${baseButtonClasses} ${activeStatus === status ? activeButtonClasses : inactiveButtonClasses}`}
                            >
                                <div className="flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-white text-sm font-medium font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{status}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Konten / Daftar Item */}
                <div className="content-grid flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {/* Anda bisa menaruh konten item di sini */}
                    {collectionsData.map((collection, index) => (
                        <CollectionCard key={index} data={collection} />
                    ))}
                </div>
            </div>
        </div>
    )
}
