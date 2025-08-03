'use client'

import React from 'react';
import Link from 'next/link';
import TextButton from '../../ui/button/textButton';
import Image from 'next/image';
import HomeSwiper from './homeSwiper';

const About = () => {
    return (
        <>
            <HomeSwiper />
            <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 w-[312px] lg:w-[1240px] min-h-[60vh] mx-auto">
                <div className='flex flex-col lg:flex-row gap-8 items-center'>
                    <Image
                        priority
                        width={350}
                        height={350}
                        alt="logo"
                        src="/icons/KeeChain.svg"
                        className='size-[200px] lg:size-[350px]'
                    />
                    <div className='content-container flex flex-col gap-8'>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
                            Who are we?
                        </h2>
                        <p className="text-base md:text-xl lg:text-2xl text-gray-300 animate-fade-in-delay-1 text-justify">
                            We started as a Hackathon project for the <span className='font-bold'>LISK Challenge Round 2</span>. Our goal was to merge the rich culture of chirping bird competitions with the immutable power of the blockchain.
                        </p>
                        <p className="text-base md:text-xl lg:text-2xl text-gray-300 animate-fade-in-delay-2 text-justify">
                            The name itself is a testament to this fusion, blending the Indonesian word <span className='font-semibold'>"Kicau,"</span> which means 'to chirp,' with <span className='font-semibold'>Blockchain.</span> KeeChain is where your champion singing bird&apos;s legacy is forever immortalized as an NFT.
                        </p>
                        <Link href="/walletInventory/collections" className="animate-fade-in-delay-3 mx-auto">
                            <TextButton label="Explore My Collections" size="M" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;