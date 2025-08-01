'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton, IconTextButton } from "../ui/button";

// --- Wagmi Imports ---
// Tambahkan useReadContract dan hooks lainnya
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useConnect, useReadContract } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { parseAbiItem, getEventSelector } from 'viem';

// --- Import konstanta yang sudah diperbarui ---
import { COLLECTION_MANAGER_ABI } from '../../constants/COLLECTION_MANAGER_ABI';
import { COLLECTION_MANAGER_ADDRESS, LISK_TESTNET_CHAIN_ID } from '../../constants/index';
// ABI ini akan digunakan untuk mengambil semua koleksi
import { PRODUCT_NFT_ABI } from "../../constants/PRODUCT_NFT_ABI"; 

export default function Layout({ children }: { children: React.ReactNode }) {
    // --- STATE UNTUK FORM & MODAL "CREATE COLLECTION" ---
    const [modalAddCollectionIsOpen, setModalAddCollection] = useState<boolean>(false);
    const [dataAddCollectionModalisError, setDataAddCollectionModalisError] = useState({
        collectionImage: false,
        collectionName: false,
        collectionCategoy: false,
    });
    const [dataAddCollectionModal, setDataAddCollectionModal] = useState({
        collectionImagePreview: "/images/placeholder_100x100.png",
        collectionImage: null as File | null,
        collectionName: "",
        collectionCategoy: ""
    });
    const [isUploadingCollectionImage, setIsUploadingCollectionImage] = useState(false);
    const [isCreatingCollection, setIsCreatingCollection] = useState(false);
    const [createdCollectionId, setCreatedCollectionId] = useState<number | null>(null);

    // --- STATE UNTUK FORM & MODAL "ADD ITEM" ---
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

    // --- STATE BARU UNTUK MENGAMBIL DAN MENYIMPAN KOLEKSI ---
    const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
    const [userCollections, setUserCollections] = useState<any[]>([]); // State untuk menyimpan daftar koleksi

    const categoryOptions = [
        { value: 'Shoes', label: 'Shoes' },
        { value: 'Watch', label: 'Watch' },
        { value: 'Card', label: 'Card' },
    ];

    const menuData = [
        { label: 'Collections', href: '/walletInventory/collections' },
        { label: 'Items', href: '/walletInventory/items' },
    ];

    const fileInputAddCollectionRef = useRef<HTMLInputElement>(null);
    const fileInputAddItemRef = useRef<HTMLInputElement>(null); // Ref untuk input file Add Item

    // --- WAGMI HOOKS ---
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();

    // Hook untuk mengambil daftar ID koleksi yang dibuat oleh pengguna
    const { data: collectionIds, isError: collectionsError, isLoading: collectionsLoading } = useReadContract({
        address: COLLECTION_MANAGER_ADDRESS,
        abi: COLLECTION_MANAGER_ABI,
        functionName: 'getCollectionsByCreator',
        args: [address as `0x${string}`],
        query: {
            enabled: isConnected && !!address, // Hanya aktifkan query jika wallet terhubung
        }
    });

    // Hook untuk create collection
    const { data: collectionHash, writeContract: writeCreateCollection, isPending: isPendingCreate, error: writeCreateError } = useWriteContract();
    const { isLoading: isConfirmingCreate, isSuccess: isSuccessCreate, data: createReceipt, error: confirmCreateError } = useWaitForTransactionReceipt({ hash: collectionHash });
    
    // Hook untuk add item
    const { data: itemHash, writeContract: writeAddItem, isPending: isPendingAdd, error: writeAddError } = useWriteContract();
    const { isLoading: isConfirmingAdd, isSuccess: isSuccessAdd, data: addReceipt, error: confirmAddError } = useWaitForTransactionReceipt({ hash: itemHash });

    // Efek untuk mengambil data koleksi setelah IDnya tersedia
    useEffect(() => {
        if (collectionIds && isConnected) {
            if (collectionIds.length > 0 && selectedCollectionId === null) {
                // Set ID koleksi pertama sebagai yang dipilih secara default
                setSelectedCollectionId(Number(collectionIds[0]));
            }
            // Di sini Anda bisa menambahkan logika untuk mengambil detail setiap koleksi
        }
    }, [collectionIds, isConnected, selectedCollectionId]);
    
    // --- FUNGSI HELPER UPLOAD KE IPFS (PINATA) ---
    const uploadFileToIPFS = async (file: File): Promise<string> => {
        // ... (implementasi yang sudah ada) ...
        return "ipfs://example-uri"; // Placeholder
    };
    const uploadJsonToIPFS = async (jsonData: any): Promise<string> => {
        // ... (implementasi yang sudah ada) ...
        return "ipfs://example-metadata-uri"; // Placeholder
    };
    
    // --- HANDLER UNTUK "CREATE COLLECTION" ---
    const handleCloseAddCollectionModal = () => { /* ... */ };
    const handleSaveAddCollectionModal = async () => { /* ... */ };

    // --- HANDLER UNTUK "ADD ITEM" ---
    const handleCloseAddItemModal = () => {
        setModalAddItem(false);
        setModalAddItem2(false);
        setDataAddItemModal({
            itemImagePreview: "/images/placeholder_300x200.png",
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
    };
    const handleBackModalAddItem = () => {
        setModalAddItem(true);
        setModalAddItem2(false);
    };

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
        if (selectedCollectionId === null) {
            alert("Please create a collection first or select one.");
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
            
            await writeAddItem({ 
                address: COLLECTION_MANAGER_ADDRESS,
                abi: COLLECTION_MANAGER_ABI,
                functionName: 'addItem',
                args: [BigInt(selectedCollectionId), metadataUri], // Perbaikan: menggunakan BigInt
                chainId: LISK_TESTNET_CHAIN_ID,
            });
        } catch (err) {
            console.error("Error minting item:", err);
            alert(`An error occurred during minting: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsMinting(false);
        }
    };

    // --- HANDLER PERUBAHAN INPUT FORM ---
    const handleChangeAddCollectionModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { /* ... */ }
    const handleImageAddCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => { /* ... */ }
    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setDataAddItemModal({ ...dataAddItemModal, [prop]: event.target.value })
    }
    const handleImageAddItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setDataAddItemModal({ ...dataAddItemModal, itemImage: file, itemImagePreview: URL.createObjectURL(file) });
        }
    };
    const handleEditItemDisplayClick = () => {
        fileInputAddItemRef.current?.click();
    };

    // --- useEffect untuk memantau status transaksi ---
    useEffect(() => { /* ... */ }, [isSuccessCreate, createReceipt, collectionHash, isConfirmingCreate, writeCreateError, confirmCreateError]);

    useEffect(() => {
        if (isSuccessAdd && addReceipt) {
            const eventAbi = parseAbiItem('event ItemAdded(uint256 indexed targetCollectionId, uint256 indexed tokenId)');
            const eventTopic = getEventSelector(eventAbi);
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
            alert(`Add Item failed (Wagmi error): ${writeAddError.message}.`);
        }
        if (confirmAddError) {
            console.error("Wagmi transaction confirmation error (Add Item):", confirmAddError);
            alert(`Add Item failed (Confirmation error): ${confirmAddError.message}. Check Lisk Block Explorer for details.`);
        }
    }, [isSuccessAdd, addReceipt, itemHash, isConfirmingAdd, writeAddError, confirmAddError]);
    
    const isAnyProcessPending = isUploadingCollectionImage || isPendingCreate || isConfirmingCreate || isCreatingCollection ||
                               isUploadingItem || isPendingAdd || isConfirmingAdd || isMinting;

    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col h-full">
            <DetailCard
                label={address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Wallet Not Connected"}
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
            
            {isAnyProcessPending && (
                <div className="text-center mt-4 text-white">
                    {isUploadingCollectionImage ? "Uploading collection image to IPFS..." : 
                     isCreatingCollection ? "Creating collection..." :
                     isUploadingItem ? "Uploading item image/metadata to IPFS..." :
                     isMinting ? "Minting NFT..." :
                     "Waiting for wallet confirmation..."}
                </div>
            )}
            {createdCollectionId !== null && (
                <div className="text-center mt-2 text-green-500 font-bold">
                    <p>Collection created with ID: {createdCollectionId}</p>
                </div>
            )}
            {mintedTokenId !== null && (
                <div className="text-center mt-2 text-green-500 font-bold">
                    <p>Item minted! Token ID: {mintedTokenId}</p>
                </div>
            )}

            {/* --- MODAL CREATE COLLECTION (sudah ada) --- */}
            {/* ... */}
            
            {/* --- MODAL UNTUK ADD ITEM --- */}
            <MiniModal
                isOpen={modalAddItemIsOpen}
                onClose={handleCloseAddItemModal}
                title="ADD ITEM"
                onConfirm={handleContinueModalAddItem}
                confirmButtonText="CONTINUE"
                disableConfirm={!isConnected || isAnyProcessPending} children={undefined}            >
                {/* ... (Form modal 1) ... */}
            </MiniModal>
            <MiniModal
                isOpen={modalAddItem2IsOpen}
                onClose={handleCloseAddItemModal}
                title="ADD ITEM"
                onConfirm={handleSaveAddItemModal}
                onCancel={handleBackModalAddItem}
                cancelButtonText="BACK"
                confirmButtonText="ADD ITEM"
                disableConfirm={isAnyProcessPending} children={undefined}            >
                {/* ... (Form modal 2) ... */}
            </MiniModal>
        </div >
    )
}