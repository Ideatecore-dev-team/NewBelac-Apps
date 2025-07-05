import Link from "next/link"

export default function Navbar() {
    return (
        <>
            <div data-state="Default" className="w-[1440px] px-12 py-3 left-0 top-0 absolute bg-zinc-900/60 outline outline-1 outline-Color-Grey-1 backdrop-blur-[5px] inline-flex flex-col justify-start items-center gap-2.5">
                <div className="w-full max-w-[1240px] inline-flex justify-between items-center">
                    <div className="flex justify-start items-center gap-8">
                        <div className="inline-flex flex-col justify-start items-center">
                            <div className="self-stretch text-center justify-start text-white text-xl font-normal font-['D-DIN-PRO']">PROJECT</div>
                            <div className="self-stretch text-center justify-start text-white text-xl font-bold font-['D-DIN-PRO']">REALMARK</div>
                        </div>
                    </div>
                    <div data-icon-left="false" data-icon-right="false" data-notification="false" data-sep-left="false" data-sep-right="false" data-size="M" data-state="Default" data-text="true" className="h-12 px-4 py-3 bg-Color-Grey-2 rounded-md outline outline-1 outline-offset-[-1px] outline-Color-Grey-1 flex justify-start items-center gap-4">
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Connect</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}