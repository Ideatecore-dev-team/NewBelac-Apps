'use client'
import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton } from "../ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [modalAddItemIsOpen, setModalAddItem] = useState<boolean>(false);
    const [modalAddItem2IsOpen, setModalAddItem2] = useState<boolean>(false);
    const [dataAddItemModal, setDataAddItemModal] = useState({
        itemImagePreview: "https://placehold.co/300x200.png",
        itemImage: null as File | null,
        itemName: "",
        itemUniqueTag: "#1",
        itemSize: "",
        itemProductDetails: "",
    });
    const menuData = [
        { label: 'Collections', href: '/walletInventory/collections' },
        { label: 'Items', href: '/walletInventory/items' },
    ];

    const fileInputAddItemRef = useRef<HTMLInputElement>(null);

    const handleCloseAddItemModal = () => {
        alert('GJD bkin!');
        setModalAddItem(false);
        setModalAddItem2(false);
    };
    const handleContinueModalAddItem = () => {
        setModalAddItem(false);
        setModalAddItem2(true);
    }
    const handleBackModalAddItem = () => {
        setModalAddItem(true);
        setModalAddItem2(false);
    }
    const handleSaveAddItemModal = () => {
        setModalAddItem2(false);
        alert('Data baru masuk ke state aja ya')
        // masukin logic store data dari sini ya guys
        // masukin logic store data dari sini ya guys
    }
    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataAddItemModal({ ...dataAddItemModal, [prop]: event.target.value })
    }
    const handleImageAddItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setDataAddItemModal({ ...dataAddItemModal, itemImage: file });
            setDataAddItemModal({ ...dataAddItemModal, itemImagePreview: URL.createObjectURL(file) });
        }
    };
    const handleEditDisplayClick = () => {
        fileInputAddItemRef.current?.click();
    };
    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col">
            <DetailCard
                label="0x512c1...c5"
                labelButton="CREATE COLLECTION"
                launchedDate="June 2024"
                onClick={() => setModalAddItem(true)}
                netWorth={0}
                itemsCount={0}
            />
            <NavButton initialMenuItems={menuData} />
            <div>{children}</div>

            <MiniModal
                isOpen={modalAddItemIsOpen}
                onClose={handleCloseAddItemModal}
                title="ADD ITEM"
                onConfirm={handleContinueModalAddItem}
                confirmButtonText="CONTINUE"
            >
                <div id="add-item-modal-wrapper" className=" space-y-3">
                    <div id="edit-item-display" className="flex items-center space-x-4">
                        <Image
                            priority
                            height={150}
                            width={100}
                            src={dataAddItemModal.itemImagePreview}
                            alt="item-imagge"
                        />
                        <TextButton
                            label="Edit Item Display"
                            onClick={handleEditDisplayClick}
                            size="S"
                        />
                        <input
                            type="file"
                            ref={fileInputAddItemRef}
                            onChange={handleImageAddItemChange}
                            accept="image/png, image/jpeg, image/webp" // Batasi tipe file
                            className="hidden"
                        />
                    </div>
                    <div className="self-stretch justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-snug">Item display must match with the physical product.</div>
                    <LegendInputBox
                        legendText="Item Name"
                        placeholder="Name"
                        value={dataAddItemModal.itemName}
                        onChangeInput={handleChangeAddItemModal('itemName')}
                    />
                    <LegendInputBox
                        legendText="Unique Tags"
                        placeholder="Tag"
                        value={dataAddItemModal.itemUniqueTag}
                        disabled
                    />
                </div>
            </MiniModal>
            <MiniModal
                isOpen={modalAddItem2IsOpen}
                onClose={handleCloseAddItemModal}
                title="ADD ITEM"
                onConfirm={handleSaveAddItemModal}
                onCancel={handleBackModalAddItem}
                cancelButtonText="BACK"
                confirmButtonText="ADD ITEM"
            >
                <div id="add-item-modal-wrapper" className=" space-y-3">
                    <div className="w-36 justify-start"><span className="text-Color-White-2/70 text-xl font-semibold font-['D-DIN-PRO'] leading-7">About </span><span className="text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-7">Shoes:</span></div>
                    <LegendInputBox
                        legendText="Size"
                        placeholder="Shoses Size"
                        type="number"
                        value={dataAddItemModal.itemSize}
                        onChangeInput={handleChangeAddItemModal('itemSize')}
                    />
                    <LegendInputBox
                        legendText="Product Details"
                        placeholder="Details"
                        value={dataAddItemModal.itemProductDetails}
                        onChangeInput={handleChangeAddItemModal('itemProductDetails')}
                    />
                    <div className="self-stretch justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-snug">Please enter all details that correspond to the physical product here (e.g., description, color, etc.).</div>
                </div>
            </MiniModal>
        </div >
    )
}