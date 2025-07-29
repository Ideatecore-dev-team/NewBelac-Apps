// pages/index.tsx
'use client'; // Ini akan menjadi Client Component karena menggunakan state

import React, { useState } from 'react';
import Table, { TableColumn, TableRowData } from '@/app/ui/table/baseTable';
import Image from 'next/image';
import { BaseTextbox, LegendInputBox } from '@/app/ui/inputbox';
import { TextButton } from '@/app/ui/button';

interface WalletRow extends TableRowData {
    id: string; // Misal ID dompet atau sebagian dari alamat
    wallet: string; // Bagian dari alamat dompet
    itemsOwned: number;
    estValue: string; // Bisa number jika mau dihitung, string jika hanya tampilan
    items: string[]; // Array of image URLs or item IDs
    moreItems: number; // Jumlah item lainnya
}

const HolderPage: React.FC = () => {
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

    const [selectedSortFilter, setSelectedSortFilter] = useState('');
    const [quantityOwnedFilter, setQuantityOwnedFilter] = useState({
        min: 0,
        max: 0
    })
    const sortOption = [
        { value: 'mostOwned', label: 'Most Owned' },
        { value: 'highestPrice', label: 'Highest Price' },
        { value: 'lowestPrice', label: 'Lowest Price' },
    ];

    const handleChangeAddItemModal = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantityOwnedFilter({ ...quantityOwnedFilter, [prop]: event.target.value })
    }

    return (
        <div id='holder-page-container' className="min-h-screen text-gray-300 flex gap-3.5">
            <div id='filter-wrapper' className='min-w-[295px]'>

                <div className="filter-card flex w-full px-4 pt-4 pb-6 flex-col items-start gap-[15px] rounded-md border border-[#2C2C2C] bg-[#1A1A1A]">
                    <h1 className="self-stretch justify-start text-white text-base font-semibold font-['D-DIN-PRO'] uppercase leading-none tracking-wide">Filters</h1>

                    <LegendInputBox
                        value={selectedSortFilter}
                        onChangeSelect={(e) => setSelectedSortFilter(e.target.value)}
                        options={sortOption}
                        placeholder="Select Option"
                        size="M"
                        color="Netral"

                        // tambah ini bedanya
                        legendText="Sort    "
                        typeBox='select'
                    />

                    <div className='w-full'>
                        <label className={`text-base font-semibold'`}>
                            Quantity Owned
                        </label>
                        <div className='mt-3 inline-flex justify-center items-center gap-3'>
                            <BaseTextbox
                                value={quantityOwnedFilter.min === 0 ? '' : quantityOwnedFilter.min}
                                onChangeInput={handleChangeAddItemModal('min')}
                                placeholder="Min"
                                size="M"
                                type='number'
                            />
                            To
                            <BaseTextbox
                                value={quantityOwnedFilter.max === 0 ? '' : quantityOwnedFilter.max}
                                onChangeInput={handleChangeAddItemModal('max')}
                                placeholder="Max"
                                size="M"
                                type='number'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <TextButton
                            onClick={() => alert('apply filter')}
                            label="Apply"
                            size="M"
                            fullWidth
                        />
                    </div>
                </div>
            </div>
            <div id='table-wrapper' className='w-full'>
                <Table data={walletData} columns={walletColumns} />
            </div>
        </div>
    );
};

export default HolderPage;