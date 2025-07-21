import Image from "next/image"
import { IconTextButton } from "../button"
import { BaseButtonProps } from "../button/baseButton"

interface DetailCardProps extends BaseButtonProps {
}

const DetailCard: React.FC<DetailCardProps> = ({
    onClick = () => ({})
}) => {
    return (
        <div id="detail-card-container" className="w-[1240px] p-4 bg-[#1C1C1C] rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] inline-flex justify-start items-center gap-8">
            <div id="detail-card-wrapper-left" className="flex-1 flex justify-start items-center gap-4">
                <img className="w-14 h-14 relative rounded-full border border-Color-Grey-1" src="https://placehold.co/56x56" />
                <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch inline-flex justify-start items-center gap-4">
                        <div className="justify-start text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-tight tracking-wide">Nike Realmark</div>
                        <div className="w-0 h-5 outline outline-offset-[-0.50px] outline-[#2C2C2C]" />
                        <div className="flex justify-start items-center gap-4">
                            <Image
                                priority
                                height={18}
                                width={18}
                                src="/icons/copy-outline.svg"
                                alt="copy-button"
                            />
                            <Image
                                priority
                                height={18}
                                width={18}
                                src="/icons/ellipsis-horizontal-outline.svg"
                                alt="copy-button"
                            />
                        </div>
                    </div>
                    <div className="inline-flex justify-start items-start gap-3">
                        <div className="flex justify-start items-center gap-3">
                            <div className="px-2 py-1 bg-[#1C1C1C] rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">BY </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">0x512c1...c5</span></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-3">
                            <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Launched </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">June 2025</span></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-3">
                            <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Shoes </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="detail-card-wrapper-left" className="flex justify-end items-end gap-8">
                <div className="inline-flex flex-col justify-start items-end gap-3">
                    <div className="text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Floor price</div>
                    <div className="inline-flex justify-start items-center gap-[5px]">
                        <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">-</div>
                        <Image
                            priority
                            height={18}
                            width={18}
                            src="/icons/IDRX.svg"
                            alt="copy-button"
                        />
                    </div>
                </div>
                <div className="inline-flex flex-col justify-start items-end gap-3">
                    <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Items</div>
                    <div className="self-stretch text-right justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">-</div>
                </div>
                <div className="inline-flex flex-col justify-start items-end gap-3">
                    <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Listed</div>
                    <div className="self-stretch text-right justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">-</div>
                </div>
                <div className="inline-flex flex-col justify-start items-end gap-3">
                    <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">owner       (Unique)</div>
                    <div className="self-stretch text-right justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">-</div>
                </div>
            </div>
            <IconTextButton
                onClick={() => onClick()}
                label={"ADD ITEM"}
                icon="/icons/plus.svg"
                size='L'
            />
        </div>
    )
}

export default DetailCard;