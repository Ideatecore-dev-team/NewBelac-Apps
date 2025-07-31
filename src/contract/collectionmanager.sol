// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./productNFT.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract CollectionManager is ERC721Holder {
    ProductNFT public immutable nft;

    struct Collection {
        address creator;
        string name;
        string category;
        string imageUri;
        uint256[] itemIds;
    }

    Collection[] public collections;
    // --- TAMBAHAN DI SINI: Mapping untuk melacak koleksi per pembuat ---
    mapping(address => uint256[]) private collectionsByCreator;

    event CollectionCreated(
        uint256 indexed newCollectionId,
        address indexed creator,
        string name,
        string category,
        string imageUri
    );

    event ItemAdded(
        uint256 indexed targetCollectionId,
        uint256 indexed tokenId
    );

    constructor(address _nftContractAddress) {
        nft = ProductNFT(_nftContractAddress);
    }

    function createCollection(
        string calldata name,
        string calldata category,
        string calldata imageUri
    ) external returns (uint256 newCollectionId) {
        require(bytes(imageUri).length > 0, "CollectionManager: imageUri cannot be empty");

        newCollectionId = collections.length;

        collections.push();
        Collection storage col = collections[newCollectionId];
        col.creator = msg.sender;
        col.name = name;
        col.category = category;
        col.imageUri = imageUri;

        // --- PERBAIKAN DI SINI: Tambahkan ID koleksi ke mapping ---
        collectionsByCreator[msg.sender].push(newCollectionId);

        emit CollectionCreated(newCollectionId, msg.sender, name, category, imageUri);
    }

    function addItem(
        uint256 targetCollectionId,
        string calldata metadataUri
    ) external returns (uint256 tokenId) {
        require(targetCollectionId < collections.length, "Collection does not exist");
        require(collections[targetCollectionId].creator == msg.sender, "Not collection owner");

        tokenId = nft.mintProductNFT(metadataUri);
        nft.safeTransferFrom(address(this), msg.sender, tokenId);
        collections[targetCollectionId].itemIds.push(tokenId);

        emit ItemAdded(targetCollectionId, tokenId);
    }

    /// Mengambil data koleksi lengkap termasuk gambar IPFS
    function getCollection(uint256 collectionId)
        external
        view
        returns (
            address creator,
            string memory name,
            string memory category,
            string memory imageUri,
            uint256[] memory itemIds
        )
    {
        require(collectionId < collections.length, "Collection does not exist");
        Collection storage col = collections[collectionId];
        return (col.creator, col.name, col.category, col.imageUri, col.itemIds);
    }

    /// --- FUNGSI BARU UNTUK MENGAMBIL SEMUA ID KOLEKSI DARI SEORANG PEMBUAT ---
    function getCollectionsByCreator(address creatorAddress)
        external
        view
        returns (uint256[] memory)
    {
        return collectionsByCreator[creatorAddress];
    }
    
    function collectionsCount() external view returns (uint256) {
        return collections.length;
    }
}