// components/MenuButton.jsx
"use client"; // <--- Add this line at the very top

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function MenuButton({ initialMenuItems }) {
    const router = useRouter();
    const pathname = usePathname();

    const [menuItems, setMenuItems] = useState(initialMenuItems || []);
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        const foundActive = menuItems.find(item => item.href === pathname);
        if (foundActive) {
            setActiveItem(foundActive.href);
        } else {
            setActiveItem('');
        }
    }, [pathname, menuItems]);

    return (
        <div className="flex py-2">
            {menuItems.map((menu) => (
                <Link href={menu.href} key={menu.href} passHref>
                    <div
                        className={`
                        relative flex flex-col items-center justify-center
                        px-2 py-2 text-white text-base font-normal cursor-pointer
                        hover:text-gray-200 transition-colors duration-300
                        ${activeItem === menu.href ? '' : ''}
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