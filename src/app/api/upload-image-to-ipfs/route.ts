import pinataSDK from '@pinata/sdk';
import { NextResponse } from 'next/server';
import { Readable } from 'stream'; 

// Fungsi helper untuk mengkonversi ReadableStream ke Buffer
// Ini diperlukan karena `request.formData()` mengembalikan `File` yang punya `.stream()`
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const chunks: Buffer[] = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  try {
    // Dapatkan API Key dan Secret dari environment variables
    const pinataApiKey = process.env.PINATA_API_KEY as string;
    const pinataApiSecret = process.env.PINATA_API_SECRET as string;

    if (!pinataApiKey || !pinataApiSecret) {
      return NextResponse.json({ error: 'Pinata API keys are not configured.' }, { status: 500 });
    }

    const pinata = new pinataSDK({ pinataApiKey, pinataSecretApiKey: pinataApiSecret });

    // Dapatkan file dari request FormData
    const formData = await request.formData();
    const file = formData.get('file') as File; // Pastikan 'file' sesuai dengan nama di FormData frontend

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Konversi File stream ke Buffer
    const buffer = await streamToBuffer(file.stream());

    // Unggah file ke Pinata
    const result = await pinata.pinFileToIPFS(Readable.from(buffer), {
      pinataMetadata: {
        name: file.name || 'uploaded_image', // Atur nama file
      },
    });

    const ipfsUri = `ipfs://${result.IpfsHash}`;
    console.log(`Image uploaded to IPFS: ${ipfsUri}`);

    return NextResponse.json({ ipfsUri });
  } catch (error) {
    console.error("Error in /api/upload-image-to-ipfs:", error);
    return NextResponse.json({ error: 'Failed to upload image to IPFS.' }, { status: 500 });
  }
}