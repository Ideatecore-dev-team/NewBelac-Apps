'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { IconTextButton } from "../ui/button";

import { injected } from 'wagmi/connectors';
import { parseAbiItem, getEventSelector } from 'viem';

// --- Import konstanta yang sudah diperbarui ---
import { COLLECTION_MANAGER_ABI } from '../../constants/COLLECTION_MANAGER_ABI';
import { COLLECTION_MANAGER_ADDRESS, LISK_TESTNET_CHAIN_ID } from '../../constants/index';
import { useAuth } from "../contexts/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [modalAddCollectionIsOpen, setModalAddCollection] = useState<boolean>(false);

    // --- STATE UNTUK FORM KOLEKSI & ERROR ---
    const [dataAddCollectionModalisError, setDataAddCollectionModalisError] = useState({
        collectionImage: false,
        collectionName: false,
        collectionCategoy: false,
    });
    const [dataAddCollectionModal, setDataAddCollectionModal] = useState({
        collectionImagePreview: "https://placehold.co/100x100.png",
        collectionImage: null as File | null,
        collectionName: "",
        collectionCategoy: ""
    });

    // --- STATE UNTUK STATUS PROSES ---
    const [isUploadingCollectionImage, setIsUploadingCollectionImage] = useState(false);
    const [isCreatingCollection, setIsCreatingCollection] = useState(false);
    const [createdCollectionId, setCreatedCollectionId] = useState<number | null>(null);

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


    const [hasMounted, setHasMounted] = useState(false);

    // --- WAGMI HOOKS UNTUK KONEKSI DAN ACCOUNT ---

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // --- WAGMI HOOKS UNTUK WRITE CONTRACT ---

    const {
        dataWriteContract: collectionHash,
        writeContract,
        writeContractIsPending: isPending,
        writeContractError: writeError,
        useWaitForTransactionReceipt,
        address,
        isConnected
    } = useAuth()

    const displayAddress = hasMounted && address
        ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
        : "Wallet Not Connected";

    const {
        isLoading: isConfirmingCreate,
        isSuccess: isSuccessCreate,
        data: createReceipt,
        error: confirmError
    } = useWaitForTransactionReceipt({ hash: collectionHash });

    const uploadFileToIPFS = async (file: File): Promise<string> => {
        setIsUploadingCollectionImage(true);
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
            setIsUploadingCollectionImage(false);
        }
    };

    const handleCloseAddCollecionModal = () => {
        setModalAddCollection(false);
        setDataAddCollectionModal({
            collectionImagePreview: "https://placehold.co/100x100.png",
            collectionImage: null,
            collectionName: "",
            collectionCategoy: ""
        });
        setDataAddCollectionModalisError({
            collectionImage: false,
            collectionName: false,
            collectionCategoy: false
        });
        setCreatedCollectionId(null);
    };

    const handleSaveAddCollectionModal = async () => {
        const newErrors = {
            collectionImage: dataAddCollectionModal.collectionImage === null,
            collectionName: dataAddCollectionModal.collectionName.trim() === "",
            collectionCategoy: dataAddCollectionModal.collectionCategoy.trim() === "",
        };
        setDataAddCollectionModalisError(newErrors);

        const isFormValid = !Object.values(newErrors).some(error => error);
        if (!isFormValid) {
            alert("Please fill all required fields.");
            return;
        }

        if (!isConnected) {
            alert("Please connect your wallet first.");
            return;
        }

        setIsCreatingCollection(true);
        setModalAddCollection(false);

        try {
            const collectionImageUri = await uploadFileToIPFS(dataAddCollectionModal.collectionImage as File);
            if (!collectionImageUri) {
                setIsCreatingCollection(false);
                return;
            }

            writeContract({
                address: COLLECTION_MANAGER_ADDRESS,
                abi: COLLECTION_MANAGER_ABI,
                functionName: 'createCollection',
                args: [dataAddCollectionModal.collectionName, dataAddCollectionModal.collectionCategoy, collectionImageUri],
                chainId: LISK_TESTNET_CHAIN_ID,
            });

        } catch (err) {
            console.error("Error creating collection:", err);
            alert(`An error occurred: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsCreatingCollection(false);
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

    useEffect(() => {
        if (isSuccessCreate && createReceipt) {
            const eventSignature = 'event CollectionCreated(uint256 indexed newCollectionId, address indexed creator, string name, string category, string imageUri)';
            const eventTopic = getEventSelector(parseAbiItem(eventSignature));
            const createdLog = createReceipt.logs.find(log => log.topics && log.topics[0] === eventTopic);
            if (createdLog && createdLog.topics && createdLog.topics[1]) {
                const collectionId = Number(BigInt(createdLog.topics[1]));
                setCreatedCollectionId(collectionId);
                alert(`Collection created! ID: ${collectionId}\nTransaction Hash: ${collectionHash}`);
            } else {
                alert("Collection created, but ID could not be extracted from logs.");
            }
        }
        if (writeError) {
            console.error("Wagmi writeContract error (Create Collection):", writeError);
            alert(`Create Collection failed (Wagmi error): ${writeError.message}.`);
        }
        if (confirmError) {
            console.error("Wagmi transaction confirmation error (Create Collection):", confirmError);
            alert(`Create Collection failed (Confirmation error): ${confirmError.message}. Check Lisk Block Explorer for details.`);
        }
    }, [isSuccessCreate, createReceipt, collectionHash, isConfirmingCreate, writeError, confirmError]);

    const isProcessPending = isUploadingCollectionImage || isPending || isConfirmingCreate || isCreatingCollection;

    return (
        <div id="layout-wallet-inventory-container" className="mt-10 flex flex-col" suppressHydrationWarning>
            <DetailCard
                label={displayAddress}
                address={address}
                labelButton="CREATE COLLECTION"
                launchedDate="June 2024"
                onClick={() => setModalAddCollection(true)}
                netWorth={0}
                itemsCount={0}
            />
            <NavButton initialMenuItems={menuData} />
            <div>{children}</div>

            {isProcessPending && (
                <div className="text-center mt-4 text-white">
                    {isUploadingCollectionImage ? "Uploading image to IPFS..." : (isPending ? "Waiting for wallet confirmation..." : "Creating collection...")}
                </div>
            )}
            {createdCollectionId !== null && (
                <div className="text-center mt-2 text-green-500 font-bold">
                    <p>Collection created with ID: {createdCollectionId}</p>
                </div>
            )}

            <MiniModal
                isOpen={modalAddCollectionIsOpen}
                onClose={handleCloseAddCollecionModal}
                title="CREATE COLLECTION"
                onConfirm={handleSaveAddCollectionModal}
                confirmButtonText="CREATE COLLECTION"
                disableConfirm={!isConnected || isProcessPending}
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
                                alt="collection-image"
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
                                accept="image/png, image/jpeg, image/webp"
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
        </div>
    )
}