'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton } from "../ui/button";

// --- Wagmi Imports ---
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { keccak256, parseAbiItem } from 'viem';

// --- Import konstanta yang sudah diperbarui ---
import { COLLECTION_MANAGER_ABI } from '../../constants/COLLECTION_MANAGER_ABI';
import { COLLECTION_MANAGER_ADDRESS, LISK_TESTNET_CHAIN_ID } from '../../constants/index';

export default function Layout({ children }: { children: React.ReactNode }) {
    // --- STATE UNTUK FORM & MODAL "ADD ITEM" ---
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
    
    // --- STATE UNTUK ERROR VALIDASI FORM "ADD ITEM" ---
    const [dataAddItemModalisError, setDataAddItemModalisError] = useState({
        itemImage: false,
        itemName: false,
        itemSize: false,
        itemProductDetails: false,
    });

    // --- STATE UNTUK STATUS PROSES "ADD ITEM" ---
    const [isUploadingItem, setIsUploadingItem] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

    const menuData = [
        { label: 'Items', href: '/collections/items' },
        { label: 'Holder', href: '/collections/holder' },
    ];

    const fileInputAddItemRef = useRef<HTMLInputElement>(null);

    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    
    // --- WAGMI HOOKS UNTUK ADD ITEM ---
    const { 
        data: itemHash, 
        writeContract: writeAddItem, 
        writeContractAsync: writeAddItemAsync,
        isPending: isPendingAdd, 
        error: writeAddError 
    } = useWriteContract();
    
    const { 
        isLoading: isConfirmingAdd, 
        isSuccess: isSuccessAdd, 
        data: addReceipt, 
        error: confirmAddError 
    } = useWaitForTransactionReceipt({ hash: itemHash });

    // --- FUNGSI HELPER UPLOAD KE IPFS (PINATA) ---
    const uploadFileToIPFS = async (file: File): Promise<string> => {
        setIsUploadingItem(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('/api/upload-image-to-ipfs', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`IPFS image upload failed: ${errorData.error || response.statusText}`);
            }
            const data = await response.json();
            return data.ipfsUri;
        } catch (err) {
            console.error("Error uploading image to IPFS:", err);
            alert(`Failed to upload image to IPFS: ${err instanceof Error ? err.message : String(err)}`);
            return '';
        } finally {
            setIsUploadingItem(false);
        }
    };
    
    const uploadJsonToIPFS = async (jsonData: any): Promise<string> => {
        try {
            const response = await fetch('/api/upload-json-to-ipfs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`IPFS JSON upload failed: ${errorData.error || response.statusText}`);
            }
            const data = await response.json();
            return data.ipfsUri;
        } catch (err) {
            console.error("Error uploading JSON to IPFS:", err);
            alert(`Failed to upload metadata to IPFS: ${err instanceof Error ? err.message : String(err)}`);
            return '';
        }
    };

    const handleCloseAddItemModal = () => {
        setModalAddItem(false);
        setModalAddItem2(false);
        setDataAddItemModal({
            itemImagePreview: "https://placehold.co/300x200.png",
            itemImage: null,
            itemName: "",
            itemUniqueTag: "#1",
            itemSize: "",
            itemProductDetails: "",
        });
        setDataAddItemModalisError({
            itemImage: false, itemName: false, itemSize: false, itemProductDetails: false,
        });
        setMintedTokenId(null);
    };

    const handleContinueModalAddItem = () => {
        const newErrors = {
            itemImage: dataAddItemModal.itemImage === null,
            itemName: dataAddItemModal.itemName.trim() === "",
            itemSize: false,
            itemProductDetails: false,
        };
        setDataAddItemModalisError(newErrors);

        const isFormValid = !Object.values(newErrors).some(error => error);
        if (!isFormValid) {
            alert("Please fill in item image and name.");
            return;
        }

        setModalAddItem(false);
        setModalAddItem2(true);
    }

    const handleBackModalAddItem = () => {
        setModalAddItem(true);
        setModalAddItem2(false);
    }

    // --- LOGIKA MINTING NFT ---
    const handleSaveAddItemModal = async () => {
        const newErrors = {
            itemImage: dataAddItemModal.itemImage === null,
            itemName: dataAddItemModal.itemName.trim() === "",
            itemSize: dataAddItemModal.itemSize.trim() === "",
            itemProductDetails: dataAddItemModal.itemProductDetails.trim() === "",
        };
        setDataAddItemModalisError(newErrors);

        const isFormValid = !Object.values(newErrors).some(error => error);
        if (!isFormValid) {
            alert("Please fill all required fields.");
            return;
        }
        if (!isConnected) {
            alert("Please connect your wallet first.");
            return;
        }

        setIsMinting(true);
        setModalAddItem2(false);

        try {
            const imageUri = await uploadFileToIPFS(dataAddItemModal.itemImage as File);
            if (!imageUri) throw new Error("Failed to upload image.");

            const metadata = {
                name: dataAddItemModal.itemName,
                description: dataAddItemModal.itemProductDetails,
                image: imageUri,
                attributes: [{ trait_type: "Size", value: dataAddItemModal.itemSize }],
            };
            const metadataUri = await uploadJsonToIPFS(metadata);
            if (!metadataUri) throw new Error("Failed to upload metadata.");

            // Panggil kontrak addItem
            await writeAddItemAsync({ 
                address: COLLECTION_MANAGER_ADDRESS,
                abi: COLLECTION_MANAGER_ABI,
                functionName: 'addItem',
                args: [0, metadataUri], // <-- Ganti `0` dengan ID koleksi yang benar
                chainId: LISK_TESTNET_CHAIN_ID,
            });

        } catch (err) {
            console.error("Error minting item:", err);
            alert(`An error occurred during minting: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsMinting(false);
        }
    };
    
    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setDataAddItemModal({ ...dataAddItemModal, [prop]: event.target.value })
    }
    const handleImageAddItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setDataAddItemModal({ ...dataAddItemModal, itemImage: file, itemImagePreview: URL.createObjectURL(file) });
        }
    };
    const handleEditDisplayClick = () => {
        fileInputAddItemRef.current?.click();
    };

    // --- useEffect untuk memantau status transaksi "Add Item" ---
    useEffect(() => {
        if (isSuccessAdd && addReceipt) {
            const eventAbi = parseAbiItem('event ItemAdded(uint256 indexed targetCollectionId, uint256 indexed tokenId)');
            const eventTopic = keccak256(encodeEventSignature(eventAbi));
            const addedLog = addReceipt.logs.find(log => log.topics && log.topics[0] === eventTopic);
            if (addedLog && addedLog.topics && addedLog.topics[2]) {
                const tokenId = Number(BigInt(addedLog.topics[2]));
                setMintedTokenId(tokenId);
                alert(`Item added! Token ID: ${tokenId}\nTransaction Hash: ${itemHash}`);
            } else {
                alert("Item added, but ID could not be extracted from logs.");
            }
        }
        if (writeAddError) {
            console.error("Wagmi writeContract error (Add Item):", writeAddError);
            alert(`Add Item failed (Wagmi error): ${'message' in writeAddError ? writeAddError.message : 'Unknown error'}.`);
        }
        if (confirmAddError) {
            console.error("Wagmi transaction confirmation error (Add Item):", confirmAddError);
            alert(`Add Item failed (Confirmation error): ${'message' in confirmAddError ? confirmAddError.message : 'Unknown error'}. Check Lisk Block Explorer for details.`);
        }
    }, [isSuccessAdd, addReceipt, itemHash, isConfirmingAdd, writeAddError, confirmAddError]);
    
    const isProcessPending = isUploadingItem || isPendingAdd || isConfirmingAdd || isMinting;

    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col">
            <DetailCard
                label="Nike Realmark" 
                address={address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Wallet Not Connected"}
                category="Shoes"
                labelButton="ADD ITEM"
                launchedDate="June 2024"
                onClick={() => setModalAddItem(true)}
                floorPrice={0}
                itemsCount={0}
                listedCount={0}
                owner="-"
            />
            <NavButton initialMenuItems={menuData} />
            <div>{children}</div>
            
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

function encodeEventSignature(eventAbi: { readonly name: "ItemAdded"; readonly type: "event"; readonly inputs: readonly [{ readonly type: "uint256"; readonly name: "targetCollectionId"; readonly indexed: true; }, { readonly type: "uint256"; readonly name: "tokenId"; readonly indexed: true; }]; }): `0x${string}` | import("viem").ByteArray {
    throw new Error("Function not implemented.");
}
