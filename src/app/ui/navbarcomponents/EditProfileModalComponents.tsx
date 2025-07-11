'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useState } from 'react'

interface EditProfileModalProps {
    onClose: () => void;
}

export default function EditProfileModalComponents({ onClose }: EditProfileModalProps) {
    const { address } = useAccount();
    const [email, setEmail] = useState('');

    const [isCopied, setIsCopied] = useState(false);


    const handleCopy = async () => {
        if (address) {
            await navigator.clipboard.writeText(address);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <div className='fixed top-[242px] left-0 bottom-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-[5px]'>
            <div className='profileModalComponents flex w-[400px] p-[16px] flex-col items-start rounded-[6px] border border-[#2C2C2C] bg-[#1C1C1C] gap-[20px]'>
                {/* ... bagian header modal ... */}
                <div className='container flex justify-between items-center self-stretch mb-4'>
                    <p className="text-white text-[24px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO'] uppercase">
                        Edit Profile
                    </p>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.24273 6.29009C6.53447 5.99835 7.00748 5.99835 7.29922 6.29009L17.7579 16.7488C18.0496 17.0405 18.0496 17.5135 17.7579 17.8052C17.4661 18.097 16.9931 18.097 16.7014 17.8052L6.24273 7.34658C5.95099 7.05484 5.95099 6.58183 6.24273 6.29009Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7579 6.29009C18.0496 6.58183 18.0496 7.05484 17.7579 7.34658L7.29922 17.8052C7.00748 18.097 6.53447 18.097 6.24273 17.8052C5.95099 17.5135 5.95099 17.0405 6.24273 16.7488L16.7014 6.29009C16.9931 5.99835 17.4661 5.99835 17.7579 6.29009Z" fill="white" />
                        </svg>
                    </button>
                </div>

                {/* ... bagian gambar profile ... */}
                <div className='menus-container flex-row flex gap-[12px]'>
                    <div className='picture flex items-center gap-[12px]'>
                        <div className='profile-picture flex size-[48px] justify-center items-center'>
                            <div className='flex size-[48px] justify-center items-center shrink-0 rounded-[92px] border border-[#2c2c2c] bg-[#fff]'>
                            </div>
                        </div>
                    </div>
                    <div className='menus-button flex h-[40px] py-[8px] px-[6px] items-center gap-[6px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2235 4.26758C14.3894 4.26749 14.5485 4.33334 14.6658 4.45064L15.5494 5.33423C15.6667 5.45153 15.7325 5.61064 15.7324 5.77653C15.7323 5.94241 15.6663 6.10145 15.5489 6.21861L4.69888 17.044C4.65282 17.09 4.59987 17.1284 4.54193 17.1581L2.78451 18.0565C2.54316 18.1799 2.24978 18.1336 2.0581 17.942C1.86641 17.7503 1.82013 17.4569 1.9435 17.2156L2.84193 15.4577C2.87155 15.3998 2.91005 15.3468 2.95602 15.3007L13.7814 4.45113C13.8986 4.3337 14.0576 4.26767 14.2235 4.26758Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9916 2.24132C16.226 2.00707 16.5438 1.87549 16.8752 1.87549C17.2066 1.87549 17.5244 2.00707 17.7588 2.24132L17.317 2.68337L17.7591 2.2416C17.9933 2.476 18.1249 2.79382 18.1249 3.1252C18.1249 3.45658 17.9933 3.7744 17.7591 4.00879L16.8754 4.89282C16.7582 5.01009 16.5992 5.07598 16.4334 5.07598C16.2676 5.07598 16.1086 5.01009 15.9914 4.89282L15.1078 4.00884C14.8638 3.76475 14.8638 3.36909 15.1079 3.12505L15.9915 2.24146L16.4334 2.6834L15.9916 2.24132Z" fill="white" />
                        </svg>
                        <div className='text-container flex justify-center items-center'>
                            <p className="text-white text-[14px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO']">
                                Edit Profile Picture
                            </p>
                        </div>
                    </div>
                </div>

                <div className='edit-username flex flex-col items-start gap-2 self-stretch'>
                    <p className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO'] self-stretch">
                        Username
                    </p>
                    <div className='field flex h-[48px] py-[12px] px-[16px] items-center gap-2 self-stretch rounded-[6px] border border-[#2C2C2C] bg-black/45'>
                        <input
                            className="text-white/70 text-[16px] font-[500] leading-4 tracking-[0.5px] font-['D-DIN-PRO'] self-stretch grow shrink-0 basis-0 bg-transparent outline-none"
                            value={address || ''}
                            readOnly
                        />
                        <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
                            {isCopied ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                            ) : (
                                <Image priority height={14} width={14} src="/icons/copy-outline.svg" alt="IDRX" />
                            )}
                        </button>
                    </div>
                    <p className="text-white/70 text-[16px] font-[500] leading-4 tracking-[0.5px] font-['D-DIN-PRO'] self-stretch h-[22px]">
                        This is Your wallet address
                    </p>
                </div>

                <div className='edit-email flex flex-col items-start gap-2 self-stretch'>
                    <p className="text-white text-[16px] font-semibold leading-4 tracking-[0.5px] font-['D-DIN-PRO'] self-stretch">
                        Email Address
                    </p>
                    <div className='field flex h-[48px] py-[12px] px-[16px] items-center gap-2 self-stretch rounded-[6px] border border-[#2C2C2C] bg-black/45'>
                        <input
                            type="email"
                            className="text-white/70 text-[16px] font-[500] leading-4 tracking-[0.5px] font-['D-DIN-PRO'] self-stretch grow shrink-0 basis-0 bg-transparent outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}