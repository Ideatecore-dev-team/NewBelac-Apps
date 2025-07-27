// pages/index.tsx
'use client'; // Ini akan menjadi Client Component karena menggunakan state

import React from 'react';
import Table, { TableColumn, TableRowData } from '@/app/ui/table/baseTable';
import Image from 'next/image';

interface WalletRow extends TableRowData {
    id: string; // Misal ID dompet atau sebagian dari alamat
    wallet: string; // Bagian dari alamat dompet
    itemsOwned: number;
    estValue: string; // Bisa number jika mau dihitung, string jika hanya tampilan
    items: string[]; // Array of image URLs or item IDs
    moreItems: number; // Jumlah item lainnya
}

const HomePage: React.FC = () => {
    const walletData: WalletRow[] = [
        {
            id: 'wallet-1',
            ava: '/images/Profile.png',
            wallet: '83e29f',
            itemsOwned: 6,
            estValue: '-',
            items: [
                '/images/shoes.png',
                '/images/shoes.png',
                '/images/shoes.png',
            ],
            moreItems: 3,
        },
        {
            id: 'wallet-2',
            ava: '/images/Profile.png',
            wallet: 'a1b2c3',
            itemsOwned: 12,
            estValue: '$12.00',
            items: [
                '/images/shoes.png',
                '/images/shoes.png',
            ],
            moreItems: 0,
        },
    ];

    const walletColumns: TableColumn<WalletRow>[] = [
        {
            key: 'wallet',
            header: 'WALLET',
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <Image
                        priority
                        height={30}
                        width={30}
                        src={row.ava}
                        alt="copy-button"
                    />
                    <span>{row.wallet}</span>
                </div>
            ),
            cellClassName: 'font-medium'
        },
        {
            key: 'itemsOwned',
            header: 'ITEMS OWNED',
            cellClassName: 'text-left'
        },
        {
            key: 'estValue',
            header: 'EST. VALUE',
            render: (row) => (
                <div className="flex items-center gap-1.5   ">
                    <span>{row.estValue}</span>
                    <Image
                        priority
                        height={18}
                        width={18}
                        src="/icons/IDRX.svg"
                        alt="copy-button"
                    />
                </div>
            )
        },
        {
            key: 'items',
            header: 'ITEMS',
            render: (row) => (
                <div className="flex -space-x-2 overflow-hidden">
                    {row.items.slice(0, 3).map((item, index) => ( // Tampilkan hingga 3 item
                        <img
                            key={index}
                            src={item} // Gunakan path gambar dari data
                            alt={`item-${index}`}
                            className="inline-block h-10 w-10 rounded-md ring-2 ring-gray-900 bg-gray-700 object-cover"
                        />
                    ))}
                    {row.moreItems > 0 && (
                        <span className="h-10 w-10 rounded-md ring-2 ring-gray-900 bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-300">
                            +{row.moreItems}
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen text-gray-300">
            <Table data={walletData} columns={walletColumns} />
        </div>
    );
};

export default HomePage;