// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// --- IMPORT OPENZEPPELIN CONTRACTS v4.9.0 ---
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProductNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address public minter;

    modifier onlyMinter() {
        require(msg.sender == minter, "ProductNFT: Caller is not the authorized minter");
        _;
    }

    event ProductNFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string ipfsMetadataUri
    );

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function setMinter(address _newMinter) public onlyOwner {
        require(_newMinter != address(0), "ProductNFT: Minter cannot be the zero address");
        minter = _newMinter;
    }

    function mintProductNFT(
        string memory ipfsMetadataUri
    ) public onlyMinter returns (uint256) {
        require(bytes(ipfsMetadataUri).length > 0, "ProductNFT: metadataUri cannot be empty");

        _tokenIdCounter.increment();
        uint256 newProductId = _tokenIdCounter.current();

        _safeMint(msg.sender, newProductId);
        _setTokenURI(newProductId, ipfsMetadataUri);

        emit ProductNFTMinted(newProductId, msg.sender, ipfsMetadataUri);

        return newProductId;
    }
}
