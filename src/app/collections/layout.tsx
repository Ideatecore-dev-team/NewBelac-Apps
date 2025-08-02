'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton, IconTextButton } from "../ui/button";

// --- Custom Auth Context (menggantikan wagmi langsung) ---
import { useAuth } from '../contexts/AuthContext'
import { parseAbiItem, getEventSelector } from 'viem';
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';

// --- Import konstanta yang sudah diperbarui ---
import { COLLECTION_MANAGER_ABI } from '../../constants/COLLECTION_MANAGER_ABI';
import { COLLECTION_MANAGER_ADDRESS, LISK_TESTNET_CHAIN_ID } from '../../constants/index';

export default function Layout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const collectionIdFromUrl = searchParams.get('collectionId');
    const selectedCollectionId = collectionIdFromUrl ? Number(collectionIdFromUrl) : null;

    const [modalAddItemIsOpen, setModalAddItem] = useState<boolean>(false);
    const [modalAddItem2IsOpen, setModalAddItem2] = useState<boolean>(false);
    const [dataAddItemModal, setDataAddItemModal] = useState({
        itemImagePreview: "/images/placeholder_300x200.png",
        itemImage: null as File | null,
        itemName: "",
        itemUniqueTag: "#1",
        itemSize: "",
        itemProductDetails: "",
    });

    const [dataAddItemModalisError, setDataAddItemModalisError] = useState({
        itemImage: false, itemName: false, itemSize: false, itemProductDetails: false,
    });

    const [isUploadingItem, setIsUploadingItem] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);
    const [selectedCollectionDetails, setSelectedCollectionDetails] = useState<any>(null);
    const [hasMounted, setHasMounted] = useState(false);

    const menuData = [
        { label: 'Items', href: `/collections/items?collectionId=${selectedCollectionId}` },
        { label: 'Holder', href: '/collections/holder' },
    ];
    const fileInputAddItemRef = useRef<HTMLInputElement>(null);

    // --- Ambil dari useAuth ---
    const {
        address,
        isConnected,
        useReadContract: readCollection,
        writeContract: writeAddItem,
        writeContractAsync: writeAddItemAsync,
        dataWriteContract: itemHash,
        writeContractIsPending: isPendingAdd,
        writeContractError: writeAddError,
        useWaitForTransactionReceipt
    } = useAuth();

    const {
        isLoading: isConfirmingAdd,
        isSuccess: isSuccessAdd,
        data: addReceipt,
        error: confirmAddError
    } = useWaitForTransactionReceipt({ hash: itemHash });

    // Ambil data koleksi
    const { data: collectionData, isLoading: isCollectionLoading, isError: isCollectionError } = readCollection({
        address: COLLECTION_MANAGER_ADDRESS,
        abi: COLLECTION_MANAGER_ABI,
        functionName: 'getCollection',
        args: [BigInt(selectedCollectionId ?? 0)],
        query: {
            enabled: selectedCollectionId !== null && isConnected,
        },
    });

    useEffect(() => {
        if (collectionData) {
            const [creator, name, category, imageUri, itemIds] = collectionData;
            setSelectedCollectionDetails({
                label: name,
                address: creator,
                category: category,
                imageUri: imageUri,
                itemsCount: itemIds.length,
            });
        }
    }, [collectionData]);

    const uploadFileToIPFS = async (file: File): Promise<string> => { return ""; };
    const uploadJsonToIPFS = async (jsonData: any): Promise<string> => { return ""; };

    const handleCloseAddItemModal = () => { };
    const handleContinueModalAddItem = () => { };
    const handleBackModalAddItem = () => { };
    const handleSaveAddItemModal = async () => { };
    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { };
    const handleImageAddItemChange = (event: React.ChangeEvent<HTMLInputElement>) => { };
    const handleEditDisplayClick = () => { };

    const isProcessPending = isCollectionLoading || isUploadingItem || isPendingAdd || isConfirmingAdd || isMinting;
    const displayAddress = hasMounted && address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Wallet Not Connected";

    const detailCardProps = selectedCollectionDetails ? {
        label: selectedCollectionDetails.label,
        address: displayAddress,
        category: selectedCollectionDetails.category,
        labelButton: "ADD ITEM",
        launchedDate: "June 2024",
        onClick: () => setModalAddItem(true),
        netWorth: 0,
        itemsCount: selectedCollectionDetails.itemsCount,
        listedCount: 0,
        owner: selectedCollectionDetails.address,
    } : {
        label: "Select a Collection",
        address: displayAddress,
        category: "N/A",
        labelButton: "ADD ITEM",
        launchedDate: "N/A",
        onClick: () => alert("Please select a collection first."),
        netWorth: 0,
        itemsCount: 0,
        listedCount: 0,
        owner: "-",
    };

    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col" suppressHydrationWarning>
            <DetailCard {...detailCardProps} />
            <NavButton initialMenuItems={menuData} />
            {children}

            {isProcessPending && (
                <div className="text-center mt-4 text-white">
                    {isUploadingItem ? "Uploading image to IPFS..." : (isPendingAdd ? "Waiting for wallet confirmation..." : "Minting NFT...")}
                </div>
            )}
            {mintedTokenId !== null && (
                <div className="text-center mt-2 text-green-500 font-bold">
                    <p>Item minted! Token ID: {mintedTokenId}</p>
                </div>
            )}

            {/* --- MODAL ADD ITEM --- */}
            <MiniModal
                isOpen={modalAddItemIsOpen}
                onClose={handleCloseAddItemModal}
                title="ADD ITEM"
                onConfirm={handleContinueModalAddItem}
                confirmButtonText="CONTINUE"
                disableConfirm={!isConnected || isProcessPending}
            >
                <div id="add-item-modal-wrapper" className=" space-y-3">
                    <div id="edit-item-display" className="flex items-center space-x-4">
                        <Image
                            priority
                            height={150}
                            width={100}
                            src={dataAddItemModal.itemImagePreview}
                            alt="item-image"
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
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                        />
                    </div>
                    <div className="self-stretch justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-snug">Item display must match with the physical product.</div>
                    <LegendInputBox
                        legendText="Item Name"
                        placeholder="Name"
                        value={dataAddItemModal.itemName}
                        onChangeInput={handleChangeAddItemModal('itemName')}
                        required={dataAddItemModalisError.itemName}
                        requiredMsg="You must input the name"
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
                disableConfirm={isProcessPending}
            >
                <div id="add-item-modal-wrapper" className=" space-y-3">
                    <div className="w-36 justify-start"><span className="text-Color-White-2/70 text-xl font-semibold font-['D-DIN-PRO'] leading-7">About </span><span className="text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-7">Shoes:</span></div>
                    <LegendInputBox
                        legendText="Size"
                        placeholder="Shoes Size"
                        type="text"
                        value={dataAddItemModal.itemSize}
                        onChangeInput={handleChangeAddItemModal('itemSize')}
                        required={dataAddItemModalisError.itemSize}
                        requiredMsg="You must input the size"
                    />
                    <LegendInputBox
                        legendText="Product Details"
                        placeholder="Details"
                        value={dataAddItemModal.itemProductDetails}
                        onChangeInput={handleChangeAddItemModal('itemProductDetails')}
                        required={dataAddItemModalisError.itemProductDetails}
                        requiredMsg="You must input the product details"
                    />
                    <div className="self-stretch justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-snug">Please enter all details that correspond to the physical product here (e.g., description, color, etc.).</div>
                </div>
            </MiniModal>
        </div >
    )
}

function encodeEventSignature(eventAbi: {
    readonly name: "ItemAdded";
    readonly type: "event";
    readonly inputs: readonly [
        { readonly type: "uint256"; readonly name: "targetCollectionId"; readonly indexed: true; },
        { readonly type: "uint256"; readonly name: "tokenId"; readonly indexed: true; }
    ];
}): `0x${string}` | import("viem").ByteArray {
    throw new Error("Function not implemented.");
}
