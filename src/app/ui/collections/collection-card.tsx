import Image from "next/image"

export default function CollectionCard({ data }: { data: any }) {
    return (
        <div id="collection-card-container" className="w-full bg-Color-Grey-2 rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] inline-flex flex-col justify-start items-start">
            <div id="collection-card-wrapper-top" className="self-stretch h-48 relative bg-gradient-to-b from-white/0 to-black/20 rounded-md outline outline-offset-[-1px] outline-[#2C2C2C] overflow-hidden">
                <div className="absolute right-2 top-2 hover:bg-[#2C2C2C] disabled:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 transition-colors p-3 bg-transparent rounded-md outline outline-1 outline-offset-[-1px] outline-[#2C2C2C]">
                    <Image
                        priority
                        height={20}
                        width={20}
                        src="/icons/pencil-outline.svg"
                        alt="edit-collection"
                    />
                </div>
            </div>
            <div id="collection-card-wrapper-bottom" className="self-stretch bg-[#1C1C1C] px-4 py-4 inline-flex justify-between items-center overflow-hidden">
                <div className="w-fit inline-flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] leading-none tracking-wide">Nike REALmark</div>
                    <div className="self-stretch h-9 inline-flex justify-start items-start gap-8">
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch justify-start text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Floor price</div>
                            <div className="inline-flex justify-start items-center gap-[5px]">
                                <div className="flex items-center justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">
                                    10.1
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
                            <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">78</div>
                        </div>
                    </div>
                </div>
                <img className="w-12 h-12 relative rounded-[100px] border-2 border-[#2C2C2C]" src="https://placehold.co/48x48" />
            </div>
        </div>
    )
}