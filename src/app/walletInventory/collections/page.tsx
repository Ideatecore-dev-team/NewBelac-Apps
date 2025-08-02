'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CollectionCard from "@/app/ui/collections/collection-card";
import MiniModal from "@/app/ui/modal/miniModal";
import { IconTextButton } from "@/app/ui/button";
import { LegendInputBox } from "@/app/ui/inputbox";
import BlankPage from "@/app/ui/page/blankPage";

import { useAuth } from "@/app/contexts/AuthContext";
import { COLLECTION_MANAGER_ABI } from "@/constants/COLLECTION_MANAGER_ABI";
import { COLLECTION_MANAGER_ADDRESS } from "@/constants";

export default function Collections() {
    const [modalEditCollectionIsOpen, setModalEditCollection] = useState(false);
    const [modalDeleteCollectionIsOpen, setModalDeleteCollection] = useState(false);

    const [dataCollectionModal, setDataCollectionModal] = useState({
        ava: '/icons/edit-profile.svg',
        collecionName: "",
        collectionCategory: "",
    });

    const [collectionsData, setCollectionsData] = useState<any[]>([]);

    const { address, isConnected, useReadContract, useReadContracts } = useAuth();

    const { data: collectionIds, isLoading: isLoadingCollectionIds, isError: isErrorCollectionIds, error: errorCollectionIds } = useReadContract({
        address: COLLECTION_MANAGER_ADDRESS,
        abi: COLLECTION_MANAGER_ABI,
        functionName: 'getCollectionsByCreator',
        args: [address as `0x${string}`],
        query: {
            enabled: isConnected && !!address,
        },
    });

    const collectionsReadContracts = (collectionIds || []).map((id: bigint) => ({
        address: COLLECTION_MANAGER_ADDRESS,
        abi: COLLECTION_MANAGER_ABI,
        functionName: 'getCollection',
        args: [id],
    }));

    const { data: collectionsRawData = [], isLoading: isLoadingCollections, isError: isErrorCollections, error: errorCollections } = useReadContracts({
        contracts: collectionsReadContracts,
        query: {
            enabled: !isLoadingCollectionIds && ((collectionIds?.length ?? 0) > 0),
        },
    });

    useEffect(() => {
        if (collectionsRawData && collectionsRawData.length > 0 && !isLoadingCollections && collectionIds) {
            const formattedData = collectionsRawData.map((res: any, index: number) => {
                const [creator, name, category, imageUri, itemIds] = res.result;
                return {
                    id: collectionIds[index],
                    label: name,
                    category: category,
                    price: 0,
                    items: itemIds.length,
                    ava: imageUri,
                    image: imageUri,
                };
            });
            setCollectionsData(formattedData);
        }
    }, [collectionsRawData, isLoadingCollections, collectionIds]);

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
        setDataCollectionModal({ ...dataCollectionModal, [prop]: event.target.value });
    };

    return (
        <div id="collection-page-container" className="h-full w-[1240px]">
            <div id="collection-page-subtitle" className="h-full text-Color-White-2/70 mt-2 mb-4 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">
                Created collections ({collectionsData.length})
            </div>

            {(isLoadingCollectionIds || isLoadingCollections) && <p>Loading collections...</p>}
            {isErrorCollectionIds && <p>Error loading collection IDs: {errorCollectionIds?.message}</p>}
            {isErrorCollections && <p>Error loading collection data: {errorCollections?.message}</p>}

            {collectionsData.length > 0 && (
                <div id="collection-card-wrapper" className="grid grid-cols-4 w-full gap-8">
                    {collectionsData.map((collection, key) => (
                        <CollectionCard
                            key={key}
                            linkHref={`/collections/items?collectionId=${collection.id}`}
                            onEditClick={() => setModalEditCollection(true)}
                            data={collection}
                        />
                    ))}
                </div>
            )}

            {!isLoadingCollections && collectionsData.length === 0 && (
                <div className="flex justify-center items-center h-[500px] outline-1 outline-offset-[-1px] rounded-2xl outline-[#2c2c2c]">
                    <BlankPage
                        title="No Collections Created"
                        subtitle="Your created collection will appear here"
                    />
                </div>
            )}

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
                        value={dataCollectionModal.collectionCategory}
                        onChangeSelect={handleChangeDataCollectionModal('collectionCategory')}
                        options={[{ value: 'shoes', label: 'Shoes' }, { value: 'sandals', label: 'Sandals' }, { value: 'watch', label: 'Watch' }]}
                        placeholder="Select Category"
                        size="M"
                        color="Netral"
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
                <div className="self-stretch justify-start text-Color-White-2/70 text-base font-semibold font-['D-DIN-PRO'] leading-snug">
                    Are you sure you want to delete this collection? All Birds will flee from the holders’ wallets. The collection itself will remain permanently recorded on the blockchain.
                </div>
            </MiniModal>
        </div>
    );
}
