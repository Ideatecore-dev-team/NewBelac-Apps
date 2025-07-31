"use client";
import Image from "next/image";
import { useState, FC } from "react";

import { LegendInputBox } from "@/app/ui/inputbox";

type FilterStatus = 'All' | 'Listed' | 'Not Listed';

interface Collection {
    id: number;
    label: string;
    price: number;
    items: number;
    filterStatus: FilterStatus;
    // image: string; //biar nggak bug
}

interface CollectionCardProps {
    data: Collection;
}

const CollectionCard: FC<CollectionCardProps> = ({ data }) => (
    <div className="items-card w-[295px] bg-Color-Grey-2 rounded-md border border-[#2C2C2C] bg-Color-Gray-2 inline-flex flex-col justify-start items-start overflow-hidden">
        <Image
            priority
            width={295}
            height={192}
            // sizes="(max-width: 295px)"
            src="/images/shoes.png"
            alt={data.label}
            className="w-[295px] h-[192px] bg-Color-Grey-1 self-stretch"
            onError={(e) => {
                e.currentTarget.src = `https://placehold.co/295x192/151515/FFF?text=Error`;
            }}
        />
        <div className="self-stretch px-4 py-4 inline-flex justify-start items-start gap-7">
            <div className="flex-1 inline-flex flex-col justify-start items-center gap-4">
                <div className="self-stretch inline-flex justify-between items-center gap-4 w-full">
                    <h1 className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{data.label}</h1>
                    <div className="flex justify-start items-center gap-1.5">
                        <div className="p-1.5 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                            <h1 className="justify-start text-[#4dacff] text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">#{data.id}</h1>
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-9 inline-flex justify-start items-end gap-8">
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="inline-flex justify-start items-center gap-[5px]">
                            <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">{data.filterStatus}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export default function Items() {
    const [activeStatus, setActiveStatus] = useState<FilterStatus>('All');

    const [dataCollectionModal, setDataCollectionModal] = useState({
        ava: '/icons/edit-profile.svg',
        collecionName: "",
        collectionSymbol: "",
        collectionCategory: "",
    })

    const collectionsData: Collection[] = [
        { id: 1, label: 'Nike Realmark A', price: 10.1, items: 68, filterStatus: "Not Listed" },
        { id: 2, label: 'Nike Realmark B', price: 10.1, items: 68, filterStatus: "Listed" },
        { id: 3, label: 'Nike Realmark C', price: 10.1, items: 68, filterStatus: "Listed" },
        { id: 4, label: 'Nike Realmark D', price: 10.1, items: 68, filterStatus: "Not Listed" },
        { id: 5, label: 'Nike Realmark E', price: 10.1, items: 68, filterStatus: "Listed" },
    ];

    const filterButtons: FilterStatus[] = ['All', 'Listed', 'Not Listed'];

    const baseButtonClasses = "h-8 px-3 py-2 rounded-md outline-offset-[-1px] flex justify-start items-center gap-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#151515] focus:ring-[#4dacff]";
    const activeButtonClasses = "bg-gradient-to-b from-zinc-900 to-gray-800 shadow-[0px_4px_5px_0px_rgba(71,175,255,0.25)] outline-[#4dacff]";
    const inactiveButtonClasses = "bg-[#1c1c1c] outline-[#2c2c2c]";

    // 4. Terapkan logika filter SEBELUM melakukan .map()
    const filteredData = collectionsData.filter(collection => {
        if (activeStatus === 'All') {
            return true; 
        }
        return collection.filterStatus === activeStatus; // Kalau syalah, samakeun statusnya
    });

    const handleChangeDataCollectionModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataCollectionModal({ ...dataCollectionModal, [prop]: event.target.value })
    }

    return (
        <div id="collection-page-container" className="flex flex-col justify-center items-center grow self-stretch bg-[#151515] text-white">
            {/* <div className="container flex w-full max-w-[1240px] flex-col items-start gap-3">
                <div id="collection-page-subtitle" className="text-gray-400 mt-2 mb-4 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Owned Items ({filteredData.length})</div>
            </div> */}

            <div className="items-div flex w-full max-w-[1240px] flex-col md:flex-row items-start gap-5">
                {/* Kolom Filter */}
                <div className="filter-card flex w-full md:w-[295px] px-4 pt-4 pb-6 flex-col items-start gap-[15px] rounded-md border border-[#2C2C2C] bg-[#1A1A1A] flex-shrink-0">
                    <h1 className="self-stretch justify-start text-white text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Filters</h1>
                    <div className="small flex items-start self-stretch">
                        <div className="field flex w-full h-[40px] p-3 items-center gap-2 rounded-md border border-[#2c2c2c] bg-black/45 flex-row">
                            <Image priority height={20} width={20} src="/icons/search.svg" alt="Search Icon" />
                            <input type="text" placeholder="Search by items" className="flex-grow text-gray-400 text-sm font-medium font-['D-DIN-PRO'] leading-[140%] bg-transparent focus:outline-none placeholder-gray-500" />
                        </div>
                    </div>
                    <Image priority height={2} width={263} src="/icons/horizontalVector.svg" alt="Divider" className="w-full" />
                    <div className="self-stretch justify-start text-white text-sm font-semibold font-['D-DIN-PRO'] leading-tight">Status</div>
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                        {filterButtons.map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`${baseButtonClasses} ${activeStatus === status ? activeButtonClasses : inactiveButtonClasses}`}
                            >
                                <div className="justify-start text-white text-sm font-medium font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{status}</div>
                            </button>
                        ))}
                    </div>
{/* 
                    <LegendInputBox
                        value={dataCollectionModal.collectionCategory}
                        onChangeSelect={handleChangeDataCollectionModal('collectionCategory')}
                        options={[{ value: 'shoes', label: 'Shoes' }, { value: 'sandals', label: 'Sandals' }, { value: 'watch', label: 'Watch' }]}
                        placeholder="Select Category"
                        size="M"
                        color="Netral"

                        // tambah ini bedanya
                        legendText="Category"
                        typeBox='select'
                        required
                        requiredMsg="You must select any category"
                    /> */}
                </div>

                {/* Daftar Item */}
                <div className="content-grid flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredData.map((collection) => (
                        <CollectionCard key={collection.id} data={collection} />
                    ))}
                </div>
            </div>
        </div>
    )
}
