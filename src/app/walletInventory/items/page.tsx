import Image from "next/image"
import CollectionCard from "@/app/ui/collections/collection-card";

export default function Items() {
    const collectionsData = [
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, image: "/nike.png" },

    ];

    return (
        <div id="collection-page-container">
            <div id="collection-page-subtitle" className="text-Color-White-2/70 mt-2 mb-4 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Owned Items ({collectionsData.length})</div>
            <div className="items-div self-stretch inline-flex justify-start items-start gap-5">
                <div className="w-72 px-4 pt-4 pb-6 bg-Color-Grey-2 rounded-md outline-offset-[-1px] outline-Color-Grey-1 inline-flex flex-col justify-start items-start gap-3.5 overflow-hidden">
                    <div className="self-stretch justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Filters</div>
                    <div className="self-stretch inline-flex justify-start items-start">
                        <div data-icon-left="true" data-icon-right="false" data-state="Default" data-text="true" data-textarea="False" className="w-64 h-10 p-3 bg-Color-Black-45%/40 rounded-md outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-start items-center gap-2">
                            <div className="w-5 h-5 relative overflow-hidden">
                                <div className="w-4 h-4 left-[2.08px] top-[2.08px] absolute bg-Color-White-1" />
                            </div>
                            <div className="flex-1 justify-start text-Color-White-2/70 text-sm font-medium font-['D-DIN-PRO'] leading-tight">Search by items</div>
                        </div>
                    </div>
                    <div className="self-stretch h-64 origin-top-left rotate-90 outline-1 outline-offset-[-0.50px] outline-Color-Grey-1" />
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] leading-tight">Status</div>
                        <div className="self-stretch inline-flex justify-start items-center gap-3">
                            <div data-icon-left="false" data-icon-right="false" data-notification="false" data-sep-left="false" data-sep-right="false" data-size="XS" data-state="Hover" data-text="true" className="h-8 px-3 py-2 bg-gradient-to-b from-zinc-900 to-gray-800 rounded-md shadow-[0px_4px_5px_0px_rgba(71,175,255,0.25)] outline-1 outline-offset-[-1px] outline-Color-Blue-1 flex justify-start items-center gap-3">
                                <div className="flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-Color-White-1 text-sm font-medium font-['D-DIN-PRO'] capitalize leading-none tracking-wide">All</div>
                                </div>
                            </div>
                            <div data-icon-left="false" data-icon-right="false" data-notification="false" data-sep-left="false" data-sep-right="false" data-size="XS" data-state="Default" data-text="true" className="h-8 px-3 py-2 bg-Color-Grey-2 rounded-md outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-start items-center gap-3">
                                <div className="flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-Color-White-1 text-sm font-medium font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Listed</div>
                                </div>
                            </div>
                            <div data-icon-left="false" data-icon-right="false" data-notification="false" data-sep-left="false" data-sep-right="false" data-size="XS" data-state="Default" data-text="true" className="h-8 px-3 py-2 bg-Color-Grey-2 rounded-md outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-start items-center gap-3">
                                <div className="flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-Color-White-1 text-sm font-medium font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Not Listed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}