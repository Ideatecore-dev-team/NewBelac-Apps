import React from "react"
import Image from "next/image"
import { IconButton } from "../button"

interface CollectionCardProps {
    data: any,
    onEditClick?: any // setiap CollectionCardProps dipanggil maka props Data dan onEditClick digunakan
}

const CollectionCard: React.FC<CollectionCardProps> = ({
    data,
    onEditClick
}) => {
    return (
        <div id="collection-card-container" className="w-full bg-Color-Grey-2 rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] inline-flex flex-col justify-start items-start">
            <div id="collection-card-wrapper-top" className={`bg-[url(${data.image || "https://placehold.co/300x200"})] self-stretch bg-center bg-cover h-48 relative rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] overflow-hidden`}>
                <div className={`absolute right-2 top-2 disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 rounded-md`}>
                    <IconButton onClick={onEditClick} icon="/icons/pencil-outline.svg" alt="edit-collection" />
                </div>
            </div>
            <div id="collection-card-wrapper-bottom" className="self-stretch bg-[#1C1C1C] px-4 py-4 inline-flex justify-between items-center overflow-hidden">
                <div className="w-fit inline-flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] leading-none tracking-wide">{data.label || "Not Found!"}</div>
                    <div className="self-stretch h-9 inline-flex justify-start items-start gap-8">
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch justify-start text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Floor price</div>
                            <div className="inline-flex justify-start items-center gap-[5px]">
                                <div className="flex items-center justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">
                                    {data.price || "Not Found!"}
                                    <Image
                                        className="ml-1"
                                        priority
                                        height={18}
                                        width={18}
                                        src="/icons/IDRX.svg"
                                        alt="copy-button"
                                    />
                                </div>
                                <div className="w-4 h-4 relative">
                                    <div className="w-4 h-4 left-0 top-0 absolute bg-Color-White-2/70" />
                                </div>
                            </div>
                        </div>
                        <div className="w-16 inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch justify-start text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Items</div>
                            <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">{data.items || "Not Found!"}</div>
                        </div>
                    </div>
                </div>
                <img className="w-12 h-12 relative rounded-[100px] border-2 border-[#2C2C2C]" src={data.ava || "https://placehold.co/48x48"} />
            </div>
        </div>
    )
}

export default CollectionCard;