import React from "react";
import Image from "next/image";
import { IconButton } from "../button"; // Asumsi path ini benar
import Link from "next/link";

// Fungsi helper untuk mengonversi URI IPFS ke URL HTTP
const resolveIpfsUrl = (ipfsUri: string): string => {
    if (!ipfsUri) {
        return "https://placehold.co/300x200.png"; // Placeholder default
    }
    const ipfsGatewayUrl = 'https://ipfs.io/ipfs/';
    const cid = ipfsUri.replace('ipfs://', '');
    return `${ipfsGatewayUrl}${cid}`;
};

interface CollectionCardProps {
    data: any;
    onEditClick?: () => void;
    linkHref: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
    data,
    onEditClick,
    linkHref
}) => {
    const imageUrl = resolveIpfsUrl(data.image);
    const avatarUrl = resolveIpfsUrl(data.ava);

    return (
        <div
            id="collection-card-container"
            className="w-[295px] bg-Color-Grey-2 rounded-md outline  outline-offset-[-1px] outline-[#2c2c2c] inline-flex flex-col justify-start items-start group"
        >
            <div
                id="collection-card-wrapper-top"
                className="self-stretch h-48 relative bg-Color-Grey-1 rounded-md outline  outline-offset-[-1px] outline-[#2c2c2c] overflow-hidden"
            >
                <Image
                    src={imageUrl}
                    alt={data.label || "Collection Image"}
                    layout="fill"
                    objectFit="cover"
                    className="h-[192px] self-stretch rounded-md transition-transform duration-300 group-hover:scale-110"
                />


                <Link href={linkHref}>
                    <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/0 flex flex-col justify-end items-center gap-2.5 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="self-stretch inline-flex justify-center items-center gap-2 mb-6">
                            <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">
                                View Collection
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.767 4.4545C12.2063 4.01517 12.9187 4.01517 13.358 4.4545L20.108 11.2045C20.5473 11.6438 20.5473 12.3562 20.108 12.7955L13.358 19.5455C12.9187 19.9848 12.2063 19.9848 11.767 19.5455C11.3277 19.1062 11.3277 18.3938 11.767 17.9545L17.7215 12L11.767 6.0455C11.3277 5.60616 11.3277 4.89384 11.767 4.4545Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5625 12C3.5625 11.3787 4.06618 10.875 4.6875 10.875H18.375C18.9963 10.875 19.5 11.3787 19.5 12C19.5 12.6213 18.9963 13.125 18.375 13.125H4.6875C4.06618 13.125 3.5625 12.6213 3.5625 12Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </Link>

                {onEditClick && (
                    <div className="absolute right-2 top-2 z-10 bg-Color-Grey-2 border border-[#2c2c2c] rounded-md hover:opacity-70">
                        <IconButton onClick={onEditClick} icon="/icons/pencil-outline.svg" alt="edit-collection" />
                    </div>
                )}
            </div>

            {/* Bagian bawah: Informasi kartu */}
            <div id="collection-card-wrapper-bottom" className="self-stretch px-4 py-4 inline-flex justify-between items-center overflow-hidden">
                <div className="w-40 inline-flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] leading-none tracking-wide">
                        {data.label || "Not Found!"}
                    </div>
                    <div className="self-stretch h-[36px] inline-flex justify-start items-start gap-8">
                        <div className="w-[75px] inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch justify-start text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Floor price</div>
                            <div className="inline-flex justify-start items-center gap-[5px]">
                                <div className="flex items-center justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">
                                    {data.price || ""}
                                    {data.price && (
                                        <Image
                                            className="ml-1"
                                            priority
                                            height={18}
                                            width={18}
                                            src="/icons/IDRX.svg"
                                            alt="currency-icon"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-[68px] inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch justify-start text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Items</div>
                            <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">
                                {data.items || "-"}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Gunakan URL gambar yang dikonversi untuk avatar DIRUBAH LAIN WAKTU Uhuy */}
                <img className="w-12 h-12 relative rounded-[100px] border-2 border-[#2c2c2c]" src={avatarUrl} alt={data.label || "Avatar"} />
            </div>
        </div>
    )
}

export default CollectionCard;
