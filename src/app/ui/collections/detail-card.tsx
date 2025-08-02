import React from "react"
import Image from "next/image"
import { IconButton, IconTextButton } from "../button"
import Link from "next/link"
import { BaseButtonProps } from "../button/baseButton"

// Fungsi helper untuk mengonversi URI IPFS ke URL HTTP
const resolveIpfsUrl = (ipfsUri: string): string => {
    if (!ipfsUri || !ipfsUri.startsWith('ipfs://')) {
        return "https://placehold.co/56x56.png"; // Placeholder default
    }
    const ipfsGatewayUrl = 'https://ipfs.io/ipfs/'; // Atau gateway Pinata Anda
    const cid = ipfsUri.replace('ipfs://', '');
    return `${ipfsGatewayUrl}${cid}`;
};

interface DetailCardProps extends BaseButtonProps {
    labelButton: string,
    avaImage?: string,
    label?: string,
    address?: string,
    launchedDate?: string,
    category?: string,
    floorPrice?: number,
    netWorth?: number,
    itemsCount?: number,
    listedCount?: number,
    owner?: string
}

const DetailCard: React.FC<DetailCardProps> = ({
    onClick = () => ({}),
    labelButton,
    avaImage,
    label = "...",
    address,
    launchedDate,
    category,
    floorPrice,
    netWorth,
    itemsCount,
    listedCount,
    owner
}) => {
    // Menggunakan fungsi helper untuk mendapatkan URL gambar yang valid
    const avatarUrl = resolveIpfsUrl(avaImage || "");

    console.log('label', label)
    console.log('address', address)

    return (
        <div id="detail-card-container" className="w-[1240px] p-4 bg-[#1C1C1C] rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] inline-flex justify-start items-center gap-8">
            <div id="detail-card-wrapper-left" className="flex-1 flex justify-start items-center gap-4">
                {/* PERBAIKAN: Menggunakan URL IPFS yang dikonversi */}
                <img className="w-14 h-14 relative rounded-full border border-Color-Grey-1" src={avatarUrl} alt="collection-avatar" />
                <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch inline-flex justify-start items-center gap-4">
                        <div className="justify-start text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-tight tracking-wide">{label}</div>
                        <div className="w-0 h-5 outline outline-offset-[-0.50px] outline-[#2C2C2C]" />
                        <div className="flex justify-start items-center gap-1">
                            <IconButton
                                icon="/icons/copy-outline.svg"
                                alt="copy"
                                size="S"
                                withoutOutline
                                onClick={() => navigator.clipboard.writeText(address || label)}
                            />
                            {
                                floorPrice !== undefined && (
                                    <IconButton
                                        icon="/icons/ellipsis-horizontal-outline.svg"
                                        alt="bakso"
                                        size="S"
                                        withoutOutline
                                        onClick={() => alert("Ini buat apa deh?")}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div className="inline-flex justify-start items-start gap-3">
                        {
                            owner && ( // PERBAIKAN: Gunakan prop `owner` untuk menampilkan alamat
                                <div className="flex justify-start items-center gap-3">
                                    <div className="px-2 py-1 bg-[#1C1C1C] rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                        <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">BY </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{owner}</span></div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            launchedDate && (
                                <div className="flex justify-start items-center gap-3">
                                    <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                        <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Launched </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{launchedDate}</span></div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            category && (
                                <div className="flex justify-start items-center gap-3">
                                    <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                        <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{category}</span></div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div id="detail-card-wrapper-left" className="flex justify-end items-end gap-8">
                {
                    floorPrice != undefined && (
                        <div className="inline-flex flex-col justify-start items-end gap-3">
                            <div className="text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Floor price</div>
                            <div className="inline-flex justify-start items-center gap-[5px]">
                                <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">{floorPrice == 0 && "-" || floorPrice}</div>
                                <Image
                                    priority
                                    height={18}
                                    width={18}
                                    src="/icons/IDRX.svg"
                                    alt="copy-button"
                                />
                            </div>
                        </div>
                    )
                }
                {
                    netWorth != undefined && (
                        <div className="inline-flex flex-col justify-start items-end gap-3">
                            <div className="text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Net Worth</div>
                            <div className="inline-flex justify-start items-center gap-[5px]">
                                <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">{netWorth == 0 && "-" || netWorth}</div>
                                <Image
                                    priority
                                    height={18}
                                    width={18}
                                    src="/icons/IDRX.svg"
                                    alt="copy-button"
                                />
                            </div>
                        </div>
                    )
                }
                {
                    itemsCount != undefined && (
                        <div className="inline-flex flex-col justify-start items-end gap-3">
                            <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Items</div>
                            <div className="self-stretch text-right justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{itemsCount || "-"}</div>
                        </div>
                    )
                }
                {
                    listedCount != undefined && (
                        <div className="inline-flex flex-col justify-start items-end gap-3">
                            <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Listed</div>
                            <div className="self-stretch text-right justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{listedCount || "-"}</div>
                        </div>
                    )
                }
                {
                    owner != undefined && (
                        <div className="inline-flex flex-col justify-start items-end gap-3">
                            <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">owner (Unique)</div>
                            <div className="self-stretch text-right justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{owner}</div>
                        </div>
                    )
                }
            </div>
            <IconTextButton
                onClick={() => onClick()}
                label={labelButton}
                icon="/icons/plus.svg"
                size='L'
            />
        </div>
    )
}

export default DetailCard;