export default function DetailCard() {
    return (
        <div className="w-[1240px] p-4 bg-Color-Grey-2 rounded-md outline outline-1 outline-offset-[-1px] outline-Color-Grey-1 inline-flex justify-start items-center gap-8">
            <div className="flex-1 flex justify-start items-center gap-4">
                <img className="w-14 h-14 relative rounded-full border border-Color-Grey-1" src="https://placehold.co/56x56" />
                <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch inline-flex justify-start items-center gap-4">
                        <div className="justify-start text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-tight tracking-wide">Nike Realmark</div>
                        <div className="w-0 h-8 outline outline-1 outline-offset-[-0.50px] outline-Color-Grey-1" />
                        <div className="flex justify-start items-center gap-4">
                            <div className="w-5 h-5 relative overflow-hidden">
                                <div className="w-3.5 h-3.5 left-[4.38px] top-[4.38px] absolute bg-Color-White-2/70" />
                                <div className="w-3.5 h-3.5 left-[1.25px] top-[1.25px] absolute bg-Color-White-2/70" />
                            </div>
                            <div className="w-5 h-5 relative overflow-hidden">
                                <div className="w-1 h-1 left-[8.12px] top-[8.12px] absolute bg-Color-White-2/70" />
                                <div className="w-1 h-1 left-[14.38px] top-[8.12px] absolute bg-Color-White-2/70" />
                                <div className="w-1 h-1 left-[1.88px] top-[8.12px] absolute bg-Color-White-2/70" />
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex justify-start items-start gap-3">
                        <div className="flex justify-start items-center gap-3">
                            <div className="p-1.5 bg-Color-Grey-2 rounded outline outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-center items-center gap-2.5">
                                <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">BY </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">0x512c1...c5</span></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-3">
                            <div className="p-1.5 bg-Color-Grey-2 rounded outline outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-center items-center gap-2.5">
                                <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Launched </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">June 2025</span></div>
                            </div>
                        </div>
                        <div className="p-1.5 bg-Color-Grey-2 rounded outline outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-center items-center gap-2.5">
                            <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Shoes</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-end gap-8">
                <div className="inline-flex flex-col justify-start items-end gap-3">
                    <div className="text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Floor price</div>
                    <div className="inline-flex justify-start items-center gap-[5px]">
                        <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">-</div>
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute bg-Color-White-2/70" />
                        </div>
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
            <div data-icon-left="true" data-icon-right="false" data-notification="false" data-sep-left="false" data-sep-right="false" data-size="L" data-state="-" data-text="true" className="h-14 p-4 bg-Color-Grey-2 rounded-md outline outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-start items-center gap-4">
                <div className="w-6 h-6 relative overflow-hidden">
                    <div className="w-3.5 h-3.5 left-[5.38px] top-[5.38px] absolute bg-Color-White-1" />
                </div>
                <div className="flex justify-center items-center gap-2.5">
                    <div className="justify-start text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-tight tracking-wide">Add item</div>
                </div>
            </div>
        </div>
    )
}