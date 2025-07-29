export const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "category",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imageUri",
                "type": "string"
            }
        ],
        "name": "createCollection",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "newCollectionId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
