'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { IconButton, IconTextButton, TextButton } from "../ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [modalAddCollectionIsOpen, setModalAddCollection] = useState<boolean>(false);
    const [dataAddCollectionModalisError, setDataAddCollectionModalisError] = useState({
        collectionImage: false,
        collectionName: false,
        collectionSymbol: false,
        collectionCategoy: false,
    })
    const [dataAddCollectionModal, setDataAddCollectionModal] = useState({
        collectionImagePreview: "https://placehold.co/100x100.png",
        collectionImage: null as File | null,
        collectionName: "0x512c1...c5",
        collectionSymbol: "",
        collectionCategoy: ""
    });

    console.log('ini data colletion', dataAddCollectionModal)

    const categoryOptions = [
        { value: 'shoes', label: 'Shoes' },
        { value: 'watch', label: 'Watch' },
        { value: 'card', label: 'Card' },
    ];

    const menuData = [
        { label: 'Collections', href: '/walletInventory/collections' },
        { label: 'Items', href: '/walletInventory/items' },
    ];

    const fileInputAddCollectionRef = useRef<HTMLInputElement>(null);

    const handleCloseAddCollecionModal = () => {
        alert('GJD bkin!');
        setModalAddCollection(false);
    };
    const handleSaveAddCollectionModal = () => {
        const newErrors = {
            collectionImage: dataAddCollectionModal.collectionImage === null,
            collectionName: dataAddCollectionModal.collectionName.trim() === "",
            collectionSymbol: dataAddCollectionModal.collectionSymbol.trim() === "",
            collectionCategoy: dataAddCollectionModal.collectionCategoy.trim() === ""
        };
        setDataAddCollectionModalisError(newErrors);

        const isFormValid = !Object.values(newErrors).some(error => error);
        if (isFormValid) {
            setModalAddCollection(false);
            alert('Data baru masuk ke state aja ya')
            // Masukin logic upload di sini
            // Masukin logic upload di sini
            // Masukin logic upload di sini
        }
    }

    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataAddCollectionModal({ ...dataAddCollectionModal, [prop]: event.target.value })
    }
    const handleImageAddItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setDataAddCollectionModal({
                ...dataAddCollectionModal,
                collectionImagePreview: URL.createObjectURL(file),
                collectionImage: file
            });
        }
    };
    const handleEditDisplayClick = () => {
        fileInputAddCollectionRef.current?.click();
    };
    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col h-full">
            <DetailCard
                label="0x512c1...c5"
                labelButton="CREATE COLLECTION"
                launchedDate="June 2024"
                onClick={() => setModalAddCollection(true)}
                netWorth={0}
                itemsCount={0}
            />
            <NavButton initialMenuItems={menuData} />
            <div className="h-full">
                {children}
            </div>

            <MiniModal
                isOpen={modalAddCollectionIsOpen}
                onClose={handleCloseAddCollecionModal}
                title="ADD ITEM"
                onConfirm={handleSaveAddCollectionModal}
                confirmButtonText="CREATE COLLECTION"
            >
                <div id="add-collection-modal-wrapper" className=" space-y-3">
                    <div id="edit-collection-display" >
                        <div className="flex items-center space-x-4">
                            <Image
                                priority
                                height={75}
                                width={75}
                                className="rounded-[100px]"
                                src={dataAddCollectionModal.collectionImagePreview}
                                alt="item-imagge"
                            />
                            <IconTextButton
                                icon="/icons/pencil-outline.svg"
                                label="Edit Collection Picture"
                                onClick={handleEditDisplayClick}
                                size="S"
                            />
                            <input
                                type="file"
                                ref={fileInputAddCollectionRef}
                                onChange={handleImageAddItemChange}
                                accept="image/png, image/jpeg, image/webp" // Batasi tipe file
                                className="hidden"
                            />
                        </div>
                        {
                            dataAddCollectionModalisError.collectionImage && (
                                <p className="text-red-400 text-sm mt-1">You must upload any picture</p>
                            )
                        }
                    </div>
                    <div className="self-stretch justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-snug">Item display must match with the physical product.</div>
                    <LegendInputBox
                        legendText="Collection Name"
                        placeholder="Name"
                        value={dataAddCollectionModal.collectionName}
                        onChangeInput={handleChangeAddItemModal('collectionName')}
                        required={dataAddCollectionModalisError.collectionName}
                        requiredMsg="You must input the name"
                    />
                    <LegendInputBox
                        legendText="Symbol"
                        placeholder="Example. SYMBL"
                        value={dataAddCollectionModal.collectionSymbol}
                        onChangeInput={handleChangeAddItemModal('collectionSymbol')}
                        required={dataAddCollectionModalisError.collectionSymbol}
                        requiredMsg="You must define the symbol"
                    />
                    <LegendInputBox
                        legendText="Category"
                        placeholder="Choose Category"
                        value={dataAddCollectionModal.collectionCategoy}
                        options={categoryOptions}
                        typeBox='select'
                        onChangeSelect={handleChangeAddItemModal('collectionCategoy')}
                        required={dataAddCollectionModalisError.collectionCategoy}
                        requiredMsg="You must select any option"
                    />
                </div>
            </MiniModal>
        </div >
    )
}