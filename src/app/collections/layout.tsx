'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton } from "../ui/button";

// --- Wagmi Imports ---
import { useAuth } from '../contexts/AuthContext';
import { injected } from 'wagmi/connectors';
import { parseAbiItem, getEventSelector } from 'viem';

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

    // --- WAGMI HOOKS UNTUK CREATE COLLECTION ---
    const {
        chainId,
        dataWriteContract,
        writeContract,
        writeContractIsPending,
        useWaitForTransactionReceipt,
        writeContractError,
        writeAddItemAsync,
    } = useAuth();
    const {
        isLoading: isConfirmingCreate,
        isSuccess: isSuccessCreate,
        data: createReceipt
    } = useWaitForTransactionReceipt({ hash: dataWriteContract });
    const { address, isConnected } = useAuth();
    const {
        isLoading: isConfirmingAdd,
        isSuccess: isSuccessAdd,
        data: addReceipt,
        error: confirmAddError
    } = useWaitForTransactionReceipt({ hash: dataWriteContract });

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

    // --- WAGMI HOOKS UNTUK ADD ITEM ---
    // Pastikan kita mendapatkan `writeAddItemAsync` dan `error` dari sini



    // --- FUNGSI HELPER UPLOAD KE IPFS (PINATA) ---
    // Fungsi ini digunakan untuk mengunggah gambar item
    const uploadFileToIPFS = async (file: File): Promise<string> => {
        setIsUploadingItem(true); // Mulai status uploading
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
            setIsUploadingItem(false); // Selesai status uploading
        }
    };

    // --- FUNGSI HELPER UNTUK UPLOAD METADATA JSON ---
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
        // Reset state modal
        setDataAddItemModal({
            itemImagePreview: "https://placehold.co/300x200.png",
            itemImage: null,
            itemName: "",
            itemUniqueTag: "#1",
            itemSize: "",
            itemProductDetails: "",
        });
        setDataAddItemModalisError({ // Reset error state
            itemImage: false, itemName: false, itemSize: false, itemProductDetails: false,
        });
        setMintedTokenId(null);
    };

    const handleContinueModalAddItem = () => {
        // Validasi form pertama (gambar dan nama item)
        const newErrors = {
            itemImage: dataAddItemModal.itemImage === null,
            itemName: dataAddItemModal.itemName.trim() === "",
            itemSize: false, // Validasi size & details di modal kedua
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
        // Validasi form kedua (size dan product details)
        const newErrors = {
            itemImage: dataAddItemModal.itemImage === null, // Harus sudah divalidasi di modal 1
            itemName: dataAddItemModal.itemName.trim() === "", // Harus sudah divalidasi di modal 1
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

        setIsMinting(true); // Mulai status minting
        setModalAddItem2(false); // Tutup modal

        try {
            // Upload gambar item ke IPFS
            const itemImageUri = await uploadFileToIPFS(dataAddItemModal.itemImage as File);
            if (!itemImageUri) throw new Error("Failed to upload item image.");

            // Buat dan upload metadata JSON untuk item
            const itemMetadata = {
                name: dataAddItemModal.itemName,
                description: dataAddItemModal.itemProductDetails,
                image: itemImageUri,
                attributes: [{ trait_type: "Size", value: dataAddItemModal.itemSize }],
            };
            const metadataUri = await uploadJsonToIPFS(itemMetadata);
            if (!metadataUri) throw new Error("Failed to upload item metadata.");

            console.log("Item metadata URI:", metadataUri);

            // Panggil kontrak addItem
            try {
                await writeAddItemAsync({ // Menggunakan async version
                    address: await COLLECTION_MANAGER_ADDRESS,
                    abi: COLLECTION_MANAGER_ABI,
                    functionName: 'addItem',
                    args: [0, metadataUri], // <-- Ganti 0 dengan collectionId yang benar
                    chainId: 4202,
                });
                console.log("Transaction hash:", dataWriteContract);
            } catch (e: any) {
                console.error("Error writing contract:", e);
                alert(`Minting failed: ${e.message || e.shortMessage || String(e)}`);
            }

        } catch (err) {
            console.error("Error minting item:", err);
            alert(`An error occurred during minting: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsMinting(false); // Selesai status minting
        }


    };

    console.log(writeContractError);

    // --- HANDLER PERUBAHAN INPUT FORM ---
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
            const eventTopic = getEventSelector(eventAbi);
            const addedLog = addReceipt.logs.find(log => log.topics && log.topics[0] === eventTopic);
            if (addedLog && addedLog.topics && addedLog.topics[2]) { // tokenId adalah indexed parameter kedua (topics[2])
                const tokenId = Number(BigInt(addedLog.topics[2]));
                setMintedTokenId(tokenId);
                alert(`Item added! Token ID: ${tokenId}\nTransaction Hash: ${dataWriteContract}`);
            } else {
                alert("Item added, but ID could not be extracted from logs.");
            }
        }
        // Penanganan error dari Wagmi
        // Asumsi error juga didapatkan dari useWriteContract hook (writeAddError)
        // dan useWaitForTransactionReceipt hook (confirmAddError)
        // Jika Anda memisahkan ini dari alur Create Collection, Anda perlu tambahkan destructuring error ini
        // Misalnya: const { error: writeAddError } = useWriteContract();
        // const { error: confirmAddError } = useWaitForTransactionReceipt({hash: dataWriteContract});
        // Lalu gunakan di sini.
        // Untuk saat ini, saya akan tambahkan placeholder, sesuaikan jika Anda ingin errornya ditampilkan
        // if (writeAddError) {
        //     console.error("Wagmi writeContract error (Add Item):", writeAddError);
        //     alert(`Add Item failed (Wagmi error): ${writeAddError.shortMessage || writeAddError.message}.`);
        // }
        // if (confirmAddError) {
        //     console.error("Wagmi transaction confirmation error (Add Item):", confirmAddError);
        //     alert(`Add Item failed (Confirmation error): ${confirmAddError.shortMessage || confirmAddError.message}. Check Lisk Block Explorer for details.`);
        // }
    }, [isSuccessAdd, addReceipt, dataWriteContract]);

    // isProcessPending untuk "Add Item"
    const isProcessPending = isUploadingItem || writeContractIsPending || isConfirmingAdd || isMinting;

    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col">
            <DetailCard
                label="Nike Realmark" // Anda mungkin ingin ini dinamis
                address={address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Wallet Not Connected"}
                category="Shoes" // Anda mungkin ingin ini dinamis
                labelButton="ADD ITEM"
                launchedDate="June 2024" // Anda mungkin ingin ini dinamis
                onClick={() => setModalAddItem(true)}
                floorPrice={0}
                itemsCount={0}
                listedCount={0}
                owner="-" // Anda mungkin ingin ini dinamis
            />
            <NavButton initialMenuItems={menuData} />
            <div>{children}</div>

            {/* Tampilkan status proses */}
            {isProcessPending && (
                <div className="text-center mt-4 text-white">
                    {isUploadingItem ? "Uploading image to IPFS..." : (writeContractIsPending ? "Waiting for wallet confirmation..." : "Minting NFT...")}
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
            // Anda juga bisa menambahkan `disableCancel` di sini jika ada tombol Cancel di modal 1
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
                        // Tambahkan validasi visual error
                        required={dataAddItemModalisError.itemName}
                        requiredMsg="You must input the name"
                    />
                    <LegendInputBox
                        legendText="Unique Tags"
                        placeholder="Tag"
                        value={dataAddItemModal.itemUniqueTag}
                        disabled // Disabled karena digenerate kontrak
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
            // Anda juga bisa menambahkan `disableCancel` di sini jika ada tombol Cancel
            >
                <div id="add-item-modal-wrapper" className=" space-y-3">
                    <div className="w-36 justify-start"><span className="text-Color-White-2/70 text-xl font-semibold font-['D-DIN-PRO'] leading-7">About </span><span className="text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-7">Shoes:</span></div>
                    <LegendInputBox
                        legendText="Size"
                        placeholder="Shoes Size"
                        type="text" // Mengubah ke text karena type="number" bisa sulit untuk input string seperti "L", "XL"
                        value={dataAddItemModal.itemSize}
                        onChangeInput={handleChangeAddItemModal('itemSize')}
                        // Tambahkan validasi visual error
                        required={dataAddItemModalisError.itemSize}
                        requiredMsg="You must input the size"
                    />
                    <LegendInputBox
                        legendText="Product Details"
                        placeholder="Details"
                        value={dataAddItemModal.itemProductDetails}
                        onChangeInput={handleChangeAddItemModal('itemProductDetails')}
                        // Tambahkan validasi visual error
                        required={dataAddItemModalisError.itemProductDetails}
                        requiredMsg="You must input the product details"
                    />
                    <div className="self-stretch justify-start text-Color-White-2/70 text-base font-medium font-['D-DIN-PRO'] leading-snug">Please enter all details that correspond to the physical product here (e.g., description, color, etc.).</div>
                </div>
            </MiniModal>
        </div >
    )
}