'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import MiniModal from '../modal/miniModal'
import { LegendInputBox } from '../inputbox'

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (data: { email: string }) => void;
}

export default function EditProfileModal({ isOpen, onClose, onSave }: EditProfileModalProps) {
    // --- State and Logic ---
    const { address } = useAuth();
    const [email, setEmail] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    // You might want to fetch and set the user's current email when the modal opens
    useEffect(() => {
        if (isOpen) {
        }
    }, [isOpen]);

    const handleCopy = async () => {
        if (address) {
            await navigator.clipboard.writeText(address);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleConfirm = () => {
        // If an onSave function is provided, call it with the new data
        if (onSave) {
            onSave({ email });
        }
        onClose(); // Close the modal after saving
    };

    return (
        <MiniModal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Profile"
            onConfirm={handleConfirm}
            confirmButtonText="Save Changes"
            onCancel={onClose}
            cancelButtonText="Cancel"
            bgColour='bg-black border-Color-Gray-1'
        >
            {/* --- Modal Body Content --- */}
            <div className='flex flex-col items-start gap-5 self-stretch w-[400px] '>
                {/* Profile Picture Section */}
                <div className='flex items-center gap-3'>
                    
                    <div className='flex size-12 justify-center items-center shrink-0 rounded-full border border-[#2c2c2c] bg-white'>
                    </div>

                    <div className='flex h-10 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-white/10'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.2235 4.26758C14.3894 4.26749 14.5485 4.33334 14.6658 4.45064L15.5494 5.33423C15.6667 5.45153 15.7325 5.61064 15.7324 5.77653C15.7323 5.94241 15.6663 6.10145 15.5489 6.21861L4.69888 17.044C4.65282 17.09 4.59987 17.1284 4.54193 17.1581L2.78451 18.0565C2.54316 18.1799 2.24978 18.1336 2.0581 17.942C1.86641 17.7503 1.82013 17.4569 1.9435 17.2156L2.84193 15.4577C2.87155 15.3998 2.91005 15.3468 2.95602 15.3007L13.7814 4.45113C13.8986 4.3337 14.0576 4.26767 14.2235 4.26758Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.9916 2.24132C16.226 2.00707 16.5438 1.87549 16.8752 1.87549C17.2066 1.87549 17.5244 2.00707 17.7588 2.24132L17.317 2.68337L17.7591 2.2416C17.9933 2.476 18.1249 2.79382 18.1249 3.1252C18.1249 3.45658 17.9933 3.7744 17.7591 4.00879L16.8754 4.89282C16.7582 5.01009 16.5992 5.07598 16.4334 5.07598C16.2676 5.07598 16.1086 5.01009 15.9914 4.89282L15.1078 4.00884C14.8638 3.76475 14.8638 3.36909 15.1079 3.12505L15.9915 2.24146L16.4334 2.6834L15.9916 2.24132Z" fill="white" />
                        </svg>
                        <p className="text-sm font-semibold leading-4 tracking-wide text-white font-['D-DIN-PRO']">
                            Edit Profile Picture
                        </p>
                    </div>
                </div>

                {/* Username Section */}
                <div className='flex w-full flex-col items-start gap-2'>
                    <label className="text-base font-semibold leading-4 tracking-wide text-white font-['D-DIN-PRO']">
                        Username
                    </label>
                    <div className='flex h-12 w-full items-center gap-2 self-stretch rounded-md border border-[#2C2C2C] bg-black/45 px-4 py-3'>
                        <input
                            className="w-full flex-1 bg-transparent text-base font-medium leading-4 tracking-wide text-white/70 outline-none font-['D-DIN-PRO']"
                            value={address || ''}
                            readOnly
                        />
                        <button onClick={handleCopy} className="text-gray-400 transition-colors hover:text-white">
                            {isCopied ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                            ) : (
                                <Image priority height={14} width={14} src="/icons/copy-outline.svg" alt="Copy Icon" />
                            )}
                        </button>
                    </div>
                    <p className="text-base font-medium leading-4 tracking-wide text-white/70 font-['D-DIN-PRO']">
                        This is your wallet address.
                    </p>
                </div>

                {/* Email Section */}
                <div className='flex w-full flex-col items-start gap-2'>
                    <label className="text-base font-semibold leading-4 tracking-wide text-white font-['D-DIN-PRO']">
                        Email Address
                    </label>
                    <div className='flex h-12 w-full items-center gap-2 self-stretch rounded-md border border-[#2C2C2C] bg-black/45 px-4 py-3'>
                        <input
                            type="email"
                            className="w-full flex-1 bg-transparent text-base font-medium leading-4 tracking-wide text-white/70 outline-none font-['D-DIN-PRO']"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

            </div>
        </MiniModal>
    );
}