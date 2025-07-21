'use client'
import Image from "next/image"
import CollectionCard from "@/app/ui/collections/collection-card";
import MiniModal from "@/app/ui/modal/miniModal";
import { useState } from "react";
import { IconTextButton } from "@/app/ui/button";
import { LegendInputBox } from "@/app/ui/inputbox";

export default function Collections() {
    const [modalEditCollectionIsOpen, setModalEditCollection] = useState<boolean>(false);
    const [modalDeleteCollectionIsOpen, setModalDeleteCollection] = useState<boolean>(false);
    const [dataCollectionModal, setDataCollectionModal] = useState({
        ava: '/icons/edit-profile.svg',
        collecionName: "",
        collectionSymbol: "",
        collectionCategory: "",
    })

    const collectionsData = [
        { label: 'Nike Realmark', price: 10.1, items: 68, ava: "https://placehold.co/48x48", image: "https://placehold.co/300x200.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, ava: "https://placehold.co/48x48", image: "https://placehold.co/300x200" },
        { label: 'Nike Realmark', price: 10.1, items: 68, ava: "/images/nike.png", image: "https://placehold.co/300x200.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, ava: "https://placehold.co/48x48", image: "/images/nike.png" },
        { label: 'Nike Realmark', price: 10.1, items: 68, ava: "/images/nike.png", image: "/images/nike.png" },
    ];

    const handleCancelConfirmModalCloseEditModal = () => setModalEditCollection(false);
    const handleCancelActionEditModal = () => {
        setModalEditCollection(false);
        setModalDeleteCollection(true);
    };
    const handleProceedActionEditModal = () => {
        alert('Aksi Lanjutkan Dilakukan!');
        setModalEditCollection(false);
    };

    const handleCancelConfirmModalCloseDeleteModal = () => setModalDeleteCollection(false);
    const handleCancelActionDeleteModal = () => {
        confirm('BNRN dihapus!?!?');
        setModalDeleteCollection(false);
    };
    const handleProceedActionDeleteModal = () => {
        alert('GJD dihapus!');
        setModalDeleteCollection(false);
    };

    const handleChangeDataCollectionModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataCollectionModal({ ...dataCollectionModal, [prop]: event.target.value })
    }
    return (
        <div id="collection-page-container">
            <div id="collection-page-subtitle" className="text-Color-White-2/70 mt-2 mb-4 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Created collections ({collectionsData.length})</div>
            <div id="collection-card-wrapper" className="grid grid-cols-4 w-full gap-8">
                {collectionsData.map((collection, key) => (
                    <CollectionCard onEditClick={() => setModalEditCollection(true)} data={collection} />
                ))}
            </div>

            <MiniModal
                isOpen={modalEditCollectionIsOpen}
                onClose={handleCancelConfirmModalCloseEditModal}
                title="EDIT COLLECTION"
                onCancel={handleCancelActionEditModal}
                onConfirm={handleProceedActionEditModal}
                cancelButtonText="Delete"
                icon="/icons/trash-outline-red.svg"
                confirmButtonText="Edit Collection"
            >
                <div id="mini-modal-wrapper" className="space-y-4 w-full">
                    <div className="flex space-x-2 items-center">
                        <img className="w-18 h-18 relative rounded-[100px] border-2 border-[#2C2C2C]" src={"/images/nike.png"} />
                        <div>
                            <IconTextButton
                                label="Edit Collection Picture"
                                icon="/icons/edit-profile.svg"
                                size="S"
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                    <LegendInputBox
                        value={dataCollectionModal.collecionName}
                        onChangeInput={handleChangeDataCollectionModal('collecionName')}
                        placeholder="Masukan Nama Collection"
                        legendText="Collection Name"
                        legendPosition="top"
                        size="M"
                    />
                    <LegendInputBox
                        value={dataCollectionModal.collectionSymbol}
                        onChangeInput={handleChangeDataCollectionModal('collectionSymbol')}
                        placeholder="Example SYMBL"
                        legendText="Symbol"
                        legendPosition="top"
                        size="M"
                    />

                    <LegendInputBox
                        value={dataCollectionModal.collectionCategory}
                        onChangeSelect={handleChangeDataCollectionModal('collectionCategory')}
                        options={[{ value: 'shoes', label: 'Shoes' }, { value: 'sandals', label: 'Sandals' }, { value: 'watch', label: 'Watch' }]}
                        placeholder="Select Category"
                        size="M"
                        color="Netral"

                        // tambah ini bedanya
                        legendText="Category"
                        typeBox='select'
                        required
                        requiredMsg="You must select any category"
                    />
                </div>
            </MiniModal>

            <MiniModal
                isOpen={modalDeleteCollectionIsOpen}
                onClose={handleCancelConfirmModalCloseDeleteModal}
                title="DELETE COLLECTION"
                onCancel={handleCancelActionDeleteModal}
                onConfirm={handleProceedActionDeleteModal}
                cancelButtonText="Continue Delete"
                icon="/icons/trash-outline-red.svg"
                confirmButtonText="Cancel"
            >
                <div className="self-stretch justify-start text-Color-White-2/70 text-base font-semibold font-['D-DIN-PRO'] leading-snug">Are you sure you want to delete this collection? All items will be burned from the holders’ wallets. The collection itself will remain permanently recorded on the blockchain.</div>
            </MiniModal>
        </div>
    )
}