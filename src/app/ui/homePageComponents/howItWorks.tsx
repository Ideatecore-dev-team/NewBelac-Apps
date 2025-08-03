'use client'

import React from 'react';
import Image from 'next/image';

interface HowItWorksStepProps {
    stepNumber: number;
    title: string;
    description: string;
    iconSrc: string;
    altText: string;
}

// Card component for each step
const HowItWorksStep = ({ stepNumber, title, description, iconSrc, altText }: HowItWorksStepProps) => {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-Color-Grey-2 rounded-xl border border-[#4CABFF] transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <div className="relative w-16 h-16 mb-4">
                <Image
                    src={iconSrc}
                    alt={altText}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="text-[#4CABFF] text-3xl font-bold mb-2">
                {stepNumber}
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-sm md:text-base text-gray-400">{description}</p>
        </div>
    );
};

// Main How It Works component
const HowItWorksSection = () => {
    const steps = [
        {
            stepNumber: 1,
            title: "Connect Your Wallet",
            description: "Securely link your digital wallet to our platform to begin your journey.",
            iconSrc: "/icons/wallet.svg", // Replace with your actual icon path
            altText: "Connect Wallet Icon"
        },
        {
            stepNumber: 2,
            title: "Add a Collection",
            description: "Create a new collection for your birds or choose an existing one.",
            iconSrc: "/icons/Collections.svg", // Replace with your actual icon path
            altText: "Add Collection Icon"
        },
        {
            stepNumber: 3,
            title: "Customize Your Bird",
            description: "Fill in the details for your bird, including its unique traits and competition records.",
            iconSrc: "/images/Bird.png", // Replace with your actual icon path
            altText: "Customize Bird Icon"
        },
        {
            stepNumber: 4,
            title: "Mint Your NFT",
            description: "Immortalize your champion bird on the blockchain as a unique NFT.",
            iconSrc: "/icons/NFTicons.svg", // Replace with your actual icon path
            altText: "Mint NFT Icon"
        },
    ];

    return (
        <section className="py-20 lg:py-32 w-[312px] lg:w-[1240px] mx-auto text-center px-4 md:px-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                How It <span className="text-[#4CABFF]">Works</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Follow these simple steps to mint your champion singing bird as a unique NFT on the blockchain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <HowItWorksStep
                        key={index}
                        stepNumber={step.stepNumber}
                        title={step.title}
                        description={step.description}
                        iconSrc={step.iconSrc}
                        altText={step.altText}
                    />
                ))}
            </div>
        </section>
    );
};

export default HowItWorksSection;