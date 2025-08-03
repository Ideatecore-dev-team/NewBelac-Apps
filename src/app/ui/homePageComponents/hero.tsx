'use client'

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAuth } from '../../contexts/AuthContext';
import { ConnectButton } from '@xellar/kit';
import { TextButton } from '../button';

interface CriteriaCardProps {
    title: string;
    description: string;
}

// Cardnya
const CriteriaCard = ({ title, description }: CriteriaCardProps) => (
    <div className="bg-Color-Grey-2 rounded-xl p-6 transform transition-transform hover:scale-105 duration-300 ease-in-out border border-[#4CABFF]">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-sm md:text-base text-gray-400">{description}</p>
    </div>
);

const NormalButtonComponentsNoSSR = dynamic(() => import('../navbarComponents/normalButtonComponents'), { ssr: false });

const Homepage = () => {
    const { status } = useAuth(); // Menggunakan useAuth dari AuthContext
    const criteria = [
        { title: "Rhythm & Melody", description: "The unique and intricate song patterns of each bird." },
        { title: "Vocal Quality", description: "Clarity, tone, and power of the bird's chirping." },
        { title: "Chirp Duration", description: "The length and consistency of the bird's performance." },
        { title: "Physical Grace", description: "The unique and captivating style of the bird's posture and movement." },
    ];

    return (
        <div className="flex flex-col items-center justify-center lg:min-h-screen text-center lg:pt-0 pt-4 px-4 md:px-8 lg:px-16 w-[312px] lg:w-[1240px] mx-auto relative overflow-hidden">
            {/* Animasi Ikon Burung */}
            <div className="absolute top-0 left-0 lg:size-[50px] size-[20px] z-[-1] animate-fly">
                <Image
                        src="/images/Bird.png"
                        alt="Flying bird"
                        width={50}
                        height={50}
                        className='size-[40px] lg:size-[50px] opacity-50 -rotate-y-180'
                    />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4">
                The future <span className="text-[#4CABFF] hover:text-[#2c2c2c] transition-colors animate-blink">of Chirping Competitions</span> is here
            </h1>

            <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mb-8">
                KeeChain lets you immortalize your champion singing birds as NFTs. Document their triumphs, competition records, and unique vocal traits on the blockchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[312px] lg:w-full lg:max-w-6xl mt-8">
                {criteria.map((item, index) => (
                    <CriteriaCard key={index} title={item.title} description={item.description} />
                ))}
            </div>

            {status !== 'connected' ? (
                <ConnectButton.Custom>
                    {({ isConnected, openConnectModal }) => {
                        if (isConnected) {
                            return (
                                <h1> CONNECTED </h1>
                            );
                        }
                        return (
                            <div className='mt-12'>
                                <TextButton onClick={openConnectModal} label='GUIDE YOUR BIRD INTO WEB3' size='M' />
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            ) : (
                <Link href="/walletcollections">
                    <div className="mt-12 inline-block px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-xl">
                        Explore the Aviary
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Homepage;