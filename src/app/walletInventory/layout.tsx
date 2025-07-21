'use client'
import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton } from "../ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [modalAddItemIsOpen, setModalAddItem] = useState<boolean>(false);
    const [modalAddItem2IsOpen, setModalAddItem2] = useState<boolean>(false);
    const [dataAddItemModal, setDataAddItemModal] = useState({
        itemImage: "",
        itemName: "",
        itemUniqueTag: "#1",
        itemSize: 0,
        itemProductDetails: "",
    });
    const menuData = [
        { label: 'Collections', href: '/walletInventory/collections' },
        { label: 'Items', href: '/walletInventory/items' },
    ];


    const handleCloseAddItemModal = () => {
        alert('GJD bkin!');
        setModalAddItem(false);
    };
    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataAddItemModal({ ...dataAddItemModal, [prop]: event.target.value })
    }
    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col">
            <DetailCard onClick={() => setModalAddItem(true)} />
            <NavButton initialMenuItems={menuData} />
            <div>{children}</div>

            <MiniModal
                isOpen={modalAddItemIsOpen}
                onClose={handleCloseAddItemModal}
                title="ADD ITEM"
                onConfirm={() => setModalAddItem(false)}
                confirmButtonText="CONTINUE"
            >
                <div id="add-item-modal-wrapper" className=" space-y-3">
                    <div id="edit-item-display" className="flex items-center space-x-4">
                        <Image
                            priority
                            height={150}
                            width={100}
                            src="https://placehold.co/300x200.png"
                            alt="item-imagge"
                        />
                        {/* <div> */}
                        <TextButton
                            label="Edit Item Display"
                            onClick={() => alert('iya keklik')}
                            size="S"
                        />
                        {/* </div> */}
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
            </MiniModal >
        </div >
    )
}