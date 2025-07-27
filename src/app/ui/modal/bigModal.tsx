'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { IconButton } from '../button';

// Definisikan interface untuk props Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionImage: string;
    collectionName: string;
    collectionSymbol: string;
    collectionCategory: string;
    itemImage: string;
    itemName: string;
    itemOwner: string;
    itemPrice: number;
    itemUniqueTag: string;
    itemSize: string;
    itemProductDetails?: string;

    // Props opsional untuk tombol
    onCancel?: () => void; // Fungsi yang dipanggil saat tombol Cancel diklik
    onConfirm?: () => void; // Fungsi yang dipanggil saat tombol Confirm diklik
    cancelButtonText?: string; // Teks untuk tombol Cancel, default 'Cancel'
    confirmButtonText?: string; // Teks untuk tombol Confirm, default 'Confirm'
    icon?: string
    bgColour?: string;
}

const MiniModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onCancel,
    onConfirm,

    collectionImage,
    collectionName,
    collectionSymbol,
    collectionCategory,
    itemImage,
    itemName,
    itemOwner,
    itemPrice,
    itemUniqueTag,
    itemSize,
    itemProductDetails,

    cancelButtonText = 'Batal', // Default text
    confirmButtonText = 'Konfirmasi', // Default text
    icon = '',
    bgColour = 'bg-black'
}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeNav, setActiveNav] = useState('condition')

    useEffect(() => {
        // Efek ini HANYA untuk mengatur fokus saat modal pertama kali terbuka
        if (isOpen) {
            modalRef.current?.focus();
        }
    }, [isOpen]); // <-- KUNCI: Dependensi hanya pada `isOpen`

    useEffect(() => {
        // Efek ini untuk side-effect lain seperti listener keyboard
        setMounted(true);

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        // Fungsi cleanup akan dijalankan saat komponen unmount atau sebelum efek berjalan lagi
        return () => {
            document.removeEventListener('keydown', handleEscape);
            // Tidak perlu setMounted(false) di sini karena akan menyebabkan re-render yang tidak perlu
            // dan bisa menyebabkan masalah saat unmounting.
        };
    }, [isOpen, onClose]); // Dependensi ini sudah benar untuk listener

    if (!mounted || !isOpen) {
        return null;
    }

    return createPortal(

        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* MiniModal Content */}
            <div
                ref={modalRef}
                className={`relative rounded-xl w-auto mx-auto max-w-6xl min-w-6xl p-4 shadow-lg ${bgColour} focus:outline-[#2C2C2C] focus:outline transform transition-all`}
                tabIndex={-1} // Membuat div ini dapat difokuskan
                aria-live="assertive" // Memberi tahu screen reader tentang perubahan konten
            >

                <div className="rounded-xl w-full inline-flex space-x-6 items-center overflow-hidden">
                    <div className="min-w-[65%] self-stretch inline-flex flex-col justify-start items-start gap-4">
                        <div className={`self-stretch h-[466px] bg-[url(${itemImage})] bg-cover bg-center bg-clip-border relative bg-gradient-to-b from-white/0 to-black/20 rounded-2xl overflow-hidden`}>
                            {/* item image
                        item image
                        item image
                        item image */}
                        </div>

                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] leading-none tracking-wide">Latest product condition</div>
                            <div className="self-stretch inline-flex justify-center items-center gap-3 py-5">
                                <div className="text-center justify-start text-Color-White-2/70 text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-tight tracking-wide">preview is not exist</div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full self-stretch inline-flex flex-col justify-start items-start gap-8">
                        <div className="self-stretch flex flex-col justify-start items-start gap-3">
                            <div className="flex items-center justify-between w-full">
                                <h3 id="modal-title" className="text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-loose text-white">
                                    {itemName}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 cursor-pointer hover:text-gray-600 focus:outline-none"
                                    aria-label="Close modal"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-3">
                                <img className="w-10 h-10 relative outline-2 outline-[#2C2C2C] rounded-full" src={collectionImage} />
                                <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{collectionName}</div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-3">
                                <div className="flex justify-start items-center gap-3">
                                    <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                        <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Owned by </span><span className="text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{itemOwner}</span></div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                        <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{collectionSymbol}</span></div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <div className="px-2 py-1 bg-Color-Grey-2 rounded outline outline-offset-[-1px] outline-[#2C2C2C] flex justify-center items-center gap-2.5">
                                        <div className="justify-start"><span className="text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{collectionCategory}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch px-4 py-3 bg-Color-Grey-2 rounded-md outline-[#2C2C2C] outline-offset-[-1px] outline-Color-Grey-1 flex flex-col justify-start items-center gap-4">
                            <div className="self-stretch inline-flex justify-between items-start">
                                <div className="inline-flex flex-col justify-start items-start gap-3">
                                    <div className="justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Price</div>
                                    <div className="inline-flex justify-start items-center gap-[5px]">
                                        <div className="justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">{itemPrice === 0 && "-" || itemPrice}</div>
                                    </div>
                                </div>
                                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                                    <div className="w-20 justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Unique tags</div>
                                    <div className="inline-flex justify-start items-center gap-1.5">
                                        <div className="bg-Color-Grey-2 rounded flex justify-center items-center gap-1">
                                            <div className="justify-start text-blue-400 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{itemUniqueTag}</div>
                                            <IconButton
                                                icon='/icons/information-circle-outline.svg'
                                                size='S'
                                                alt='information-button'
                                                withoutOutline
                                                onClick={() => alert('next kmn?')}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="inline-flex flex-col justify-start items-start gap-3">
                                    <div className="self-stretch text-right justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] uppercase leading-3 tracking-wide">Size</div>
                                    <div className="self-stretch justify-start text-Color-White-1 text-base font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{itemSize}</div>
                                </div>
                            </div>
                            <div data-icon-left="false" data-icon-right="false" data-notification="false" data-property-1="Outline" data-property-2="L" data-property-3="Disabled" data-sep-left="false" data-sep-right="false" data-text="true" className="self-stretch h-14 p-4 bg-Color-Grey-1 rounded-md outline-[#2C2C2C] outline-offset-[-1px] outline-Color-Grey-2 inline-flex justify-center items-start gap-4">
                                <div className="flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-tight tracking-wide">THIS PRODUCT IS NOT LISTED</div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch inline-flex justify-start items-center gap-4">
                                <div onClick={() => setActiveNav('condition')} data-state="Clicked" className={`cursor-pointer h-10 ${activeNav === 'condition' && 'border-b-3 border-blue-500'} flex justify-center items-center`}>
                                    <div className="flex justify-center items-center gap-2.5">
                                        <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Condition</div>
                                    </div>
                                </div>
                                <div onClick={() => setActiveNav('details')} data-state="Default" className={`cursor-pointer h-10 ${activeNav === 'details' && 'border-b-3 border-blue-500'} flex justify-center items-center`}>
                                    <div className="flex justify-center items-center gap-2.5">
                                        <div className="justify-start text-Color-White-2/70 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">Details</div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                {
                                    activeNav === 'condition' && (
                                        <>
                                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                                <div className="justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] leading-3 tracking-wide">Product condition</div>
                                                <div className="inline-flex justify-start items-center gap-1.5">
                                                    <div className="rounded flex justify-center items-center gap-1">
                                                        <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] capitalize leading-none tracking-wide">-</div>
                                                        <IconButton
                                                            icon='/icons/information-circle-outline.svg'
                                                            size='S'
                                                            alt='information-button'
                                                            withoutOutline
                                                            onClick={() => alert('next kmn?')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                                <div className="justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] leading-3 tracking-wide">Description</div>
                                                <div className="justify-start text-Color-White-1 text-sm font-semibold font-['D-DIN-PRO'] leading-none tracking-wide">-</div>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    activeNav === 'details' && (
                                        <>
                                            <div className="self-stretch inline-flex flex-col justify-start items-start gap-3">
                                                <div className="justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] leading-3 tracking-wide">Product Details</div>
                                                <div className="self-stretch justify-start">
                                                    <span className="text-sm font-semibold font-['D-DIN-PRO'] leading-none tracking-wide">
                                                        The Nike Air Max 97 is a classic sneaker known for its sleek, futuristic design and full-length visible Air cushioning. Inspired by Japanese bullet trains, it features a layered, wavy upper and reflective details, offering both style and comfort. A timeless icon in streetwear and sneaker culture.
                                                    </span>
                                                    <ul className='list-disc pl-4 mt-2'>
                                                        <li>Colour: White</li>
                                                        <li>Style: HJ7272-300</li>
                                                        <li>Country/Region of Origin: Vietnam</li>
                                                    </ul>
                                                </div>
                                                <div className="justify-start"><span className="text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] leading-3 tracking-wide">Created by </span><span className="text-Color-White-1 text-xs font-semibold font-['D-DIN-PRO'] leading-3 tracking-wide">Nike</span></div>
                                            </div>
                                            <div className='inline-flex items-center gap-1.5'>
                                                <Image
                                                    width={15}
                                                    height={15}
                                                    src="/icons/alert.svg"
                                                    alt='alert-icon'
                                                />
                                                <div className="justify-start text-Color-White-2/70 text-xs font-semibold font-['D-DIN-PRO'] leading-3 tracking-wide">
                                                    Please consider checking the details with the physic product.
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >,
        document.body // Merender modal di dalam body
    );
};

export default MiniModal;