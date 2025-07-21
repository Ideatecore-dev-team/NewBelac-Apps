
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
    href: string;
    label: string;
};

export default function MenuButton({ initialMenuItems }: { initialMenuItems: MenuItem[] }) {
    const pathname = usePathname();

    const [menuItems] = useState(initialMenuItems || []);
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        // Sekarang TypeScript tahu bahwa 'item' adalah sebuah MenuItem. Error hilang.
        const foundActive = menuItems.find(item => item.href === pathname);
        if (foundActive) {
            setActiveItem(foundActive.href);
        } else {
            setActiveItem('');
        }
    }, [pathname, menuItems]);

    return (
        <div className="flex py-2">
            {/* TypeScript juga tahu bahwa 'menu' adalah MenuItem di sini. */}
            {menuItems.map((menu) => (
                <Link href={menu.href} key={menu.href} passHref>
                    <div
                        className={`
                        relative flex flex-col items-center justify-center
                        px-2 py-2 text-white text-base font-normal cursor-pointer
                        hover:text-gray-200 transition-colors duration-300
                        `}
                    >
                        {menu.label}
                        {activeItem === menu.href && (
                            <div className="absolute bottom-0 w-full h-0.5 bg-white"></div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};
