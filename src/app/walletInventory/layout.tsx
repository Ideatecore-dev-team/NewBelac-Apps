'use client'

import DetailCard from "../ui/collections/detail-card"
import NavButton from "../ui/navbutton"
import MiniModal from "../ui/modal/miniModal";
import { useState, useRef, useEffect } from "react";
import { LegendInputBox } from "../ui/inputbox";
import Image from "next/image";
import { TextButton } from "../ui/button";

// --- Wagmi Import ---
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { PRODUCT_NFT_ABI } from '../../constants/PRODUCT_NFT_ABI';
import { PRODUCT_NFT_ADDRESS, LISK_TESTNET_CHAIN_ID } from '../../constants/index'; 
import { parseAbiItem, keccak256, toBytes } from 'viem'; // Parsing Event Log

export default function Layout({ children }: { children: React.ReactNode }) {
  const [modalAddItemIsOpen, setModalAddItem] = useState<boolean>(false);
  const [modalAddItem2IsOpen, setModalAddItem2] = useState<boolean>(false);
  const [dataAddItemModal, setDataAddItemModal] = useState({
    itemImagePreview: "https://placehold.co/300x200.png",
    itemImage: null as File | null,
    itemName: "",
    itemUniqueTag: "#1", // Ini akan di-generate oleh kontrak, jadi bisa diabaikan di input atau diubah jadi display
    itemSize: "",
    itemProductDetails: "",
  });

  // --- IPFS & Blockchain State ---
  const [isUploadingToIpfs, setIsUploadingToIpfs] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

  // --- Wagmi Hooks ---
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({ hash });

  const menuData = [
    { label: 'Collections', href: '/walletInventory/collections' },
    { label: 'Items', href: '/walletInventory/items' },
  ];

  const fileInputAddItemRef = useRef<HTMLInputElement>(null);

  const handleCloseAddItemModal = () => {
    alert('Modal ditutup!');
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
    setMintedTokenId(null);
  };

  const handleContinueModalAddItem = () => {

    if (!dataAddItemModal.itemName || !dataAddItemModal.itemImage) {
      alert("Please fill Item Name and upload an image.");
      return;
    }
    setModalAddItem(false);
    setModalAddItem2(true);
  }

  const handleBackModalAddItem = () => {
    setModalAddItem(true);
    setModalAddItem2(false);
  }

  const handleChangeAddItemModal = (prop: keyof typeof dataAddItemModal) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDataAddItemModal({ ...dataAddItemModal, [prop]: event.target.value });
  }

  const handleImageAddItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDataAddItemModal(prevData => ({
        ...prevData,
        itemImage: file,
        itemImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditDisplayClick = () => {
    fileInputAddItemRef.current?.click();
  };

  // Upload file ke IPFS (API Route Pinata)
  const uploadFileToIPFS = async (file: File): Promise<string> => {
    setIsUploadingToIpfs(true);
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
      alert(`Failed to upload image to IPFS: ${err instanceof Error ? err.message : String(err)}. Check console for details.`);
      return '';
    } finally {
      setIsUploadingToIpfs(false);
    }
  };

  // upload JSON metadata ke IPFS (API Route Pinata)
  const uploadJsonToIPFS = async (jsonData: any): Promise<string> => {
    setIsUploadingToIpfs(true);
    try {
      const response = await fetch('/api/upload-json-to-ipfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      alert(`Failed to upload metadata to IPFS: ${err instanceof Error ? err.message : String(err)}. Check console for details.`);
      return '';
    } finally {
      setIsUploadingToIpfs(false);
    }
  };

  // --- Modifikasi handleSaveAddItemModal untuk Minting NFT ---
  const handleSaveAddItemModal = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!dataAddItemModal.itemImage || !dataAddItemModal.itemName || !dataAddItemModal.itemSize || !dataAddItemModal.itemProductDetails) {
      alert("Please fill all required fields, including the image.");
      return;
    }

    setModalAddItem2(false); // Tutup modal setelah semua data diisi

    try {
      // 1. Unggah Gambar ke IPFS
      const imageUri = await uploadFileToIPFS(dataAddItemModal.itemImage);
      if (!imageUri) {
        return;
      }

      // 2. Buat Metadata JSON dan Unggah ke IPFS
      const metadata = {
        name: dataAddItemModal.itemName,
        description: dataAddItemModal.itemProductDetails,
        image: imageUri, // Gunakan URI gambar yang sudah diunggah
        attributes: [
          {
            trait_type: "Size",
            value: dataAddItemModal.itemSize,
          },
        ],
      };

      const metadataUri = await uploadJsonToIPFS(metadata);
      if (!metadataUri) {
        return;
      }

      // 3. Panggil Fungsi mintProductNFT di Kontrak
      writeContract({
        address: PRODUCT_NFT_ADDRESS,
        abi: PRODUCT_NFT_ABI,
        functionName: 'mintProductNFT',
        args: [
          dataAddItemModal.itemName,
          dataAddItemModal.itemSize,
          dataAddItemModal.itemProductDetails,
          metadataUri // Kirim URI metadata lengkap ke kontrak
          // Perhatian: Kontrak Anda menerima ipfsImageUri, bukan ipfsMetadataUri
          // Anda memiliki dua string di event: ipfsImageUri dan ipfsMetadataUri
          // Di fungsi mintProductNFT: `function mintProductNFT(string memory itemName, string memory size, string memory productDetails, string memory ipfsImageUri)`
          // Artinya, parameter terakhir harusnya `imageUri` yang Anda dapatkan dari upload gambar.
          // Dan `_setTokenURI` di kontrak menggunakan `_ipfsMetadataUri` yang dibuat secara placeholder.
          // Kita perlu sedikit penyesuaian di kontrak atau cara pemanggilan di sini.
          // Untuk saat ini, saya akan mengirim imageUri ke kontrak, dan kontrak akan membuat metadataURI sendiri (placeholder)
          // Jika Anda ingin kontrak menyimpan metadataUri yang Anda buat di frontend, Anda perlu mengubah signature fungsi kontrak.
          // Contoh untuk mengirim imageUri:
          // imageUri
          // Contoh jika kontrak diubah untuk menerima metadataUri:
          // metadataUri
        ],
        chainId: LISK_TESTNET_CHAIN_ID,
      });

    } catch (err) {
      console.error("Error during NFT minting process:", err);
      alert(`An error occurred during minting: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // useEffect untuk memantau status transaksi
  useEffect(() => {
    if (isConfirmed && receipt) {
      console.log("Transaction Receipt:", receipt);
      const eventSignature = 'ProductNFTMinted(uint256,address,string,string,string,string,string,string)';
      // Import keccak256 from viem at the top: import { keccak256, toBytes } from 'viem';
      // Compute the topic hash for the event signature
      const eventTopicHash = keccak256(toBytes(eventSignature));

      const mintedLog = receipt.logs.find(log => log.topics && log.topics[0] === eventTopicHash);

      if (mintedLog && mintedLog.topics && mintedLog.topics[1]) {
        // Mengonversi heksadesimal dari topics[1] ke number
        const tokenId = Number(BigInt(mintedLog.topics[1]));
        setMintedTokenId(tokenId);
        alert(`NFT Minted! Token ID: ${tokenId}\nTransaction Hash: ${hash}`);
      } else {
        alert("Transaction confirmed, but ProductNFTMinted event not found or tokenId not extracted.");
      }
    } else if (isConfirmed && !receipt) {
      alert("Transaction confirmed, but no receipt found. Check block explorer.");
    } else if (error) {
      alert(`Error minting NFT: ${error.message}`);
    }
  }, [isConfirmed, receipt, error, hash]);


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

      {/* Tombol Connect Wallet sederhana */}
      {!isConnected && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => connect({ connector: injected() })}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={isPending || isConfirming || isUploadingToIpfs}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {isConnected && <p className="text-center text-sm text-gray-500 mt-2">Connected Wallet: {address}</p>}

      {/* Status Minting */}
      {(isUploadingToIpfs || isPending || isConfirming) && (
        <div className="text-center mt-4 text-white">
          {isUploadingToIpfs ? "Uploading to IPFS..." : (isPending ? "Waiting for wallet confirmation..." : "Minting NFT...")}
        </div>
      )}
      {hash && (
        <div className="text-center mt-2 text-white">
          <p>Transaction Hash: <a href={`https://testnet.liskscan.com/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{hash}</a></p>
          {isConfirming && <p>Waiting for transaction confirmation...</p>}
          {isConfirmed && <p className="text-green-500 font-bold">Transaction Confirmed!</p>}
          {mintedTokenId !== null && <p className="text-green-500 font-bold">Minted Token ID: {mintedTokenId}</p>}
        </div>
      )}
      {error && (
        <div className="text-center mt-2 text-red-500">
          <p>Error: {error.message}</p>
        </div>
      )}

      {/* Modal Add Item (Bagian 1) */}
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

      {/* Modal Add Item (Bagian 2) */}
      <MiniModal
        isOpen={modalAddItem2IsOpen}
        onClose={handleCloseAddItemModal}
        title="ADD ITEM"
        onConfirm={handleSaveAddItemModal} // Ini akan memicu upload IPFS dan minting
        onCancel={handleBackModalAddItem}
        cancelButtonText="BACK"
        confirmButtonText="ADD ITEM"
      >
        <div id="add-item-modal-wrapper" className=" space-y-3">
          <div className="w-36 justify-start"><span className="text-Color-White-2/70 text-xl font-semibold font-['D-DIN-PRO'] leading-7">About </span><span className="text-Color-White-1 text-xl font-semibold font-['D-DIN-PRO'] leading-7">Shoes:</span></div>
          <LegendInputBox
            legendText="Size"
            placeholder="Shoes Size"
            type="text" // Ubah ke text jika size bisa seperti "L", "XL", jika hanya angka biarkan number
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