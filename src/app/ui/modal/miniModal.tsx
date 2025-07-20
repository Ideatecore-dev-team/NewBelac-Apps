'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconTextButton, TextButton } from '../button';

// Definisikan interface untuk props Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    // Props opsional untuk tombol
    onCancel?: () => void; // Fungsi yang dipanggil saat tombol Cancel diklik
    onConfirm?: () => void; // Fungsi yang dipanggil saat tombol Confirm diklik
    cancelButtonText?: string; // Teks untuk tombol Cancel, default 'Cancel'
    confirmButtonText?: string; // Teks untuk tombol Confirm, default 'Confirm'
    icon?: string
}

const MiniModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    onCancel,
    onConfirm,
    cancelButtonText = 'Batal', // Default text
    confirmButtonText = 'Konfirmasi', // Default text
    icon = ''
}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Efek ini HANYA untuk mengatur fokus saat modal pertama kali terbuka
        if (isOpen) {
            modalRef.current?.focus();
        }
    }, [isOpen]); // <-- KUNCI: Dependensi hanya pada `isOpen`

    useEffect(() => {
        // Efek ini untuk side-effect lain seperti listener keyboard
        setMounted(true);

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        // Fungsi cleanup akan dijalankan saat komponen unmount atau sebelum efek berjalan lagi
        return () => {
            document.removeEventListener('keydown', handleEscape);
            // Tidak perlu setMounted(false) di sini karena akan menyebabkan re-render yang tidak perlu
            // dan bisa menyebabkan masalah saat unmounting.
        };
    }, [isOpen, onClose]); // Dependensi ini sudah benar untuk listener

    if (!mounted || !isOpen) {
        return null;
    }

    return createPortal(

        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* MiniModal Content */}
            <div
                ref={modalRef}
                className="relative w-auto max-w-lg mx-auto my-6 p-6 rounded-lg shadow-lg bg-black transform transition-all sm:my-8 sm:p-8"
                tabIndex={-1} // Membuat div ini dapat difokuskan
                aria-live="assertive" // Memberi tahu screen reader tentang perubahan konten
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 id="modal-title" className="text-xl font-semibold font-['D-DIN-PRO'] uppercase leading-loose text-white">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 cursor-pointer hover:text-gray-600 focus:outline-none"
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="mt-4 mb-6">{children}</div>

                {/* Footer - Tombol Opsional */}
                {(onCancel || onConfirm) && ( // Render footer hanya jika ada salah satu tombol
                    <div className="flex justify-end  space-x-3">
                        {onCancel && (
                            <div className="content-center">
                                <IconTextButton color='Alert' withoutOutline size='M' label={cancelButtonText} icon={icon} onClick={onCancel} />
                            </div>
                        )}
                        {onConfirm && (
                            <div className="content-center">
                                <TextButton size='M' label={confirmButtonText} onClick={onConfirm} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >,
        document.body // Merender modal di dalam body
    );
};

export default MiniModal;