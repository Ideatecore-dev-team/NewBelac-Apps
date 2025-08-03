"use client";
import Image from "next/image";
import { useState, FC, useEffect } from "react";
import { COLLECTION_MANAGER_ABI } from "@/constants/COLLECTION_MANAGER_ABI";
import { COLLECTION_MANAGER_ADDRESS, PRODUCT_NFT_ADDRESS } from "@/constants";
import { LegendInputBox } from "@/app/ui/inputbox";
import { useAuth } from "@/app/contexts/AuthContext";
import { useSearchParams } from 'next/navigation';
import { PRODUCT_NFT_ABI } from "@/constants/PRODUCT_NFT_ABI";
import ItemCard, { FilterStatus, Item, ItemCardProps } from "@/app/ui/collections/item-card";
import BigModal from "@/app/ui/modal/bigModal";

interface IpfsResult {
    result: string;
    status: 'success' | 'failure';
}

// Tipe data untuk metadata yang diharapkan
interface NftMetadata {
    name: string;
    description: string;
    image: string;
    attributes?: Array<{
        trait_type: string;
        value: string;
    }>;
}

// Fungsi helper untuk mengonversi URI IPFS ke URL HTTP
const resolveIpfsUrl = (ipfsUri: string): string => {
    if (!ipfsUri) {
        return "https://placehold.co/300x200.png"; // Placeholder default
    }
    const ipfsGatewayUrl = 'https://ipfs.io/ipfs/';
    const cid = ipfsUri.replace('ipfs://', '');
    return `${ipfsGatewayUrl}${cid}`;
};

export default function Items() {
    const [activeStatus, setActiveStatus] = useState<FilterStatus>('All');
    const [metadataList, setMetadataList] = useState<NftMetadata[]>([]);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState<boolean>(false);
    const [dataDetailItemOpen, setDataDetailItemOpen] = useState<object>({
        name: "",
        description: "",
        isListed: false,
        image: "",
        audio: "",
        attributes: [
        ]
    })
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dataCollectionModal, setDataCollectionModal] = useState({
        ava: '/icons/edit-profile.svg',
        collecionName: "",
        collectionSymbol: "",
        collectionCategory: "",
    })
    const searchParams = useSearchParams();
    const collectionIdFromUrl = searchParams.get('collectionId');
    const selectedCollectionId = collectionIdFromUrl ? Number(collectionIdFromUrl) : null;


    const collectionsData: Item[] = [
        { id: 1, label: 'Nike Realmark A', price: 10.1, items: 68, filterStatus: "Not Listed" },
        { id: 2, label: 'Nike Realmark B', price: 10.1, items: 68, filterStatus: "Listed" },
        { id: 3, label: 'Nike Realmark C', price: 10.1, items: 68, filterStatus: "Listed" },
        { id: 4, label: 'Nike Realmark D', price: 10.1, items: 68, filterStatus: "Not Listed" },
        { id: 5, label: 'Nike Realmark E', price: 10.1, items: 68, filterStatus: "Listed" },
    ];

    const filterButtons: FilterStatus[] = ['All', 'Listed', 'Not Listed'];

    const baseButtonClasses = "h-8 px-3 py-2 rounded-md outline-offset-[-1px] flex justify-start items-center gap-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#151515] focus:ring-[#4dacff]";
    const activeButtonClasses = "bg-gradient-to-b from-zinc-900 to-gray-800 shadow-[0px_4px_5px_0px_rgba(71,175,255,0.25)] outline-[#4dacff]";
    const inactiveButtonClasses = "bg-[#1c1c1c] outline-[#2c2c2c]";

    // --- Ambil dari useAuth ---
    const {
        address,
        isConnected,
        useReadContract,
        useReadContracts
    } = useAuth();

    const { data: collectionIds, isLoading: isLoadingCollectionIds, isError: isErrorCollectionIds, error: errorCollectionIds } = useReadContract({
        address: COLLECTION_MANAGER_ADDRESS,
        abi: COLLECTION_MANAGER_ABI,
        functionName: 'getCollectionsByCreator',
        args: [address as `0x${string}`],
        query: {
            enabled: isConnected && !!address,
        },
    });

    // Ambil data koleksi
    const { data: collectionData = [], isLoading: isCollectionLoading, isError: isCollectionError } = useReadContract({
        address: COLLECTION_MANAGER_ADDRESS,
        abi: COLLECTION_MANAGER_ABI,
        functionName: 'getCollection',
        args: [BigInt(selectedCollectionId !== null && selectedCollectionId)],
        query: {
            enabled: selectedCollectionId !== null && isConnected,
        },
    });

    const collectionsReadTokenURI = (collectionData[4] || []).map((id: bigint) => ({
        address: PRODUCT_NFT_ADDRESS,
        abi: PRODUCT_NFT_ABI,
        functionName: 'tokenURI',
        args: [id],
        query: {
            enabled: collectionData !== null && isConnected,
        },
    }));


    console.log('cooooooooooo', collectionData)

    const { data: tokenUriRawData = [], isLoading: isLoadingCollections, isError: isErrorCollections, error: errorCollections } = useReadContracts({
        contracts: collectionsReadTokenURI,
        query: {
            enabled: !isCollectionLoading && ((collectionData?.length ?? 0) > 0),
        },
    });

    console.log('ini adalah tokenUriRawData', tokenUriRawData)

    const fetchIpfsData = async (ipfsUri: string) => {
        // Mengubah IPFS URI menjadi URL HTTP
        const cid = ipfsUri.replace('ipfs://', '');
        const IPFS_GATEWAY_URL = 'https://ipfs.io/ipfs/';
        const url = `${IPFS_GATEWAY_URL}${cid}`;

        // Mengambil data dari URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from IPFS: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    };

    // Terapkan logika filter SEBELUM melakukan .map()
    const filteredData = collectionsData.filter(collection => {
        if (activeStatus === 'All') {
            return true;
        }
        return collection.filterStatus === activeStatus; // Kalau syalah, samakeun statusnya
    });

    const handleChangeDataCollectionModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataCollectionModal({ ...dataCollectionModal, [prop]: event.target.value })
    }

    useEffect(() => {

        if (tokenUriRawData && tokenUriRawData.length > 0) {
            const handleFetchAllMetadata = async () => {
                try {
                    setIsLoading(true);
                    setError(null);

                    // Buat array dari semua promise yang akan mengambil data dari IPFS
                    const fetchPromises = tokenUriRawData.map(item => {
                        if (item.status === 'success') {
                            return fetchIpfsData(item.result);
                        }
                        return null; // Abaikan item yang gagal
                    });

                    // Tunggu semua promise selesai secara paralel
                    const allMetadata = await Promise.all(fetchPromises.filter(Boolean));
                    setMetadataList(allMetadata);

                } catch (err) {
                    console.error("Error fetching IPFS data:", err);
                    setError("Failed to load collection metadata.");
                } finally {
                    setIsLoading(false);
                }
            };

            handleFetchAllMetadata();
        }
    }, [tokenUriRawData]);

    if (isLoading) {
        return <div>Loading collections...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleOpenDetailItem = (item) => {
        setIsModalDetailOpen(true)
        setDataDetailItemOpen(item)
    }
    const handleCloseDetailItemModal = () => {
        setIsModalDetailOpen(false)
        setDataDetailItemOpen({})
    }
    const getAttributeValue = (attributes, traitType) => {
        // Pastikan attributes adalah array dan tidak kosong
        if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
            return null;
        }

        // Gunakan .find() untuk mencari objek yang sesuai
        const attribute = attributes.find(attr => attr.trait_type === traitType);

        // Kembalikan 'value' jika ditemukan, atau null jika tidak
        return attribute ? attribute.value : null;
    };


    console.log('ini adalah metadataList', metadataList)


    return (
        <div id="collection-page-container" className="flex flex-col justify-center items-center grow self-stretch text-white">
            <div className="container flex w-full max-w-[1240px] flex-col items-start gap-3">
                <div id="collection-page-subtitle" className="text-gray-400 mt-2 mb-4 text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Owned Birds ({filteredData.length})</div>
            </div>

            <div className="items-div flex w-full max-w-[1240px] flex-col md:flex-row items-start gap-5">
                {/* Kolom Filter */}
                <div className="filter-card flex w-full md:w-[295px] px-4 pt-4 pb-6 flex-col items-start gap-[15px] rounded-md border border-[#2C2C2C] bg-[#1A1A1A] flex-shrink-0">
                    <h1 className="self-stretch justify-start text-white text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Filters</h1>
                    <div className="small flex items-start self-stretch">
                        <div className="field flex w-full h-[40px] p-3 items-center gap-2 rounded-md border border-[#2c2c2c] bg-black/45 flex-row">
                            <Image priority height={20} width={20} src="/icons/search.svg" alt="Search Icon" />
                            <input type="text" placeholder="Search by items" className="flex-grow text-gray-400 text-sm font-medium font-['D-DIN-PRO'] leading-[140%] bg-transparent focus:outline-none placeholder-gray-500" />
                        </div>
                    </div>
                    <Image priority height={2} width={263} src="/icons/horizontalVector.svg" alt="Divider" className="w-full" />
                    <div className="self-stretch justify-start text-white text-sm font-semibold font-['D-DIN-PRO'] leading-tight">Status</div>
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                        {filterButtons.map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`${baseButtonClasses} ${activeStatus === status ? activeButtonClasses : inactiveButtonClasses}`}
                            >
                                <div className="justify-start text-white text-sm font-medium font-['D-DIN-PRO'] capitalize leading-none tracking-wide">{status}</div>
                            </button>
                        ))}
                    </div>
                    {/* 
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
                    /> */}
                </div>

                {/* Daftar Item */}
                {
                    tokenUriRawData.length > 0 && (
                        <div className="content-grid flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                metadataList
                                    .filter(atem => atem.audio !== undefined)
                                    .map((item, key) => {
                                        console.log('ini item', item)
                                        return (
                                            <ItemCard
                                                onClick={() => handleOpenDetailItem(item)}
                                                key={key}
                                                id={key}
                                                label={item.name || ""}
                                                price={0}
                                                items={0}
                                                filterStatus={'Not Listed'}
                                                image={resolveIpfsUrl(item.image)}
                                            />
                                        )
                                    }
                                    )
                            }
                        </div>
                    )
                }
            </div>

            {
                collectionData && collectionData.length > 0 && (
                    <BigModal
                        isOpen={isModalDetailOpen}
                        onClose={handleCloseDetailItemModal}
                        collectionImage={resolveIpfsUrl(collectionData[3])}
                        collectionName={collectionData[1]}
                        collectionCategory={collectionData[2]}
                        itemImage={resolveIpfsUrl(dataDetailItemOpen?.image)}
                        itemName={dataDetailItemOpen?.name}
                        itemOwner={`${collectionData[0].substring(0, 6)}...${collectionData[0].substring(collectionData[0].length - 4)}`}
                        itemPrice={0}
                        isListed={dataDetailItemOpen?.isListed}
                        itemBirth={getAttributeValue(dataDetailItemOpen?.attributes, "Birth")}
                        itemBirdType={getAttributeValue(dataDetailItemOpen?.attributes, "BirdType")}
                        itemKeeDuration={getAttributeValue(dataDetailItemOpen?.attributes, "KeeDuration")}
                        itemBestAchievement={getAttributeValue(dataDetailItemOpen?.attributes, "BestAchievement")}
                        itemAudioUri={resolveIpfsUrl(dataDetailItemOpen?.audio)}
                    />
                )
            }
        </div>
    )
}
