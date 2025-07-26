import pinataSDK from '@pinata/sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const pinataApiKey = process.env.PINATA_API_KEY as string;
    const pinataApiSecret = process.env.PINATA_API_SECRET as string;

    if (!pinataApiKey || !pinataApiSecret) {
      return NextResponse.json({ error: 'Pinata API keys are not configured.' }, { status: 500 });
    }

    const pinata = new pinataSDK({ pinataApiKey, pinataSecretApiKey: pinataApiSecret });

    // Dapatkan body JSON dari request
    const jsonData = await request.json();

    if (!jsonData) {
      return NextResponse.json({ error: 'No JSON data provided.' }, { status: 400 });
    }

    // Unggah JSON ke Pinata
    const result = await pinata.pinJSONToIPFS(jsonData, {
      pinataMetadata: {
        name: 'nft_metadata.json', // Nama default untuk file JSON metadata
      },
    });

    const ipfsUri = `ipfs://${result.IpfsHash}`;
    console.log(`JSON metadata uploaded to IPFS: ${ipfsUri}`);

    return NextResponse.json({ ipfsUri });
  } catch (error) {
    console.error("Error in /api/upload-json-to-ipfs:", error);
    return NextResponse.json({ error: 'Failed to upload JSON to IPFS.' }, { status: 500 });
  }
}