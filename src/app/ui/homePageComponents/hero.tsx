'use client'

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAuth } from '../../contexts/AuthContext'; // Asumsi path ini benar

import { ConnectButton } from '@xellar/kit';
import { TextButton } from '../button';

// Definisikan tipe data untuk setiap card
interface ProductCardProps {
    title: string;
    description: string;
}

// Komponen Card yang bisa digunakan kembali (reusable)
const ProductCard = ({ title, description }: ProductCardProps) => (
    <div className="bg-Color-Grey-2 rounded-xl p-6 transform transition-transform hover:scale-105 duration-300 ease-in-out border border-[#4CABFF]">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
    </div>
);

// Menggunakan dynamic import untuk komponen button
const NormalButtonComponentsNoSSR = dynamic(() => import('../navbarcomponents/normalButtonComponents'), { ssr: false });

const Homepage = () => {
    const { status } = useAuth(); // Menggunakan useAuth dari AuthContext

    const products = [
        {
            title: "Carpets",
            description: "From ancient looms to modern designs, own a piece of history."
        },
        {
            title: "Cards",
            description: "Rare trading cards and exclusive collectibles, forever yours."
        },
        {
            title: "Shoes",
            description: "The most sought-after sneakers, authenticated on the blockchain."
        },
        {
            title: "Watches",
            description: "Luxury timepieces, with their unique identity as an NFT."
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8 lg:px-16 w-[1240px]">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4">
                Discover the <span className="text-gray-400">Future of Collectibles</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mb-8">
                Realmark brings exclusive physical products to the digital realm. Own authenticated NFTs of <span className='text-white font-bold'>Carpets, Cards, Shoes</span> and <span className='text-white font-bold'>Watches</span>.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-8">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        description={product.description}
                    />
                ))}
            </div>

            {/* Tombol Connect Wallet atau Link Explore */}
            {status !== 'connected' ? (
                // Tampilkan tombol Connect jika belum terhubung
                <ConnectButton.Custom>
                {({ isConnected, openConnectModal}) => {
                    if (isConnected) {
                        return (
                            <h1>
                                CONNECTED
                            </h1>
                        );
                    }
    
                    return (
                        <div className='mt-12'>
                            <TextButton
                                onClick={openConnectModal}
                                label='MINT YOUR NFT NOW'
                                size='M'
                            />
                        </div>
                    );
                }}
            </ConnectButton.Custom>
                
            ) : (
                // Tampilkan tombol Explore jika sudah terhubung
                <Link href="/explore">
                    <div className="mt-12 inline-block px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-xl">
                        Explore the Marketplace
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Homepage;