'use client'
import React, { useState } from 'react';
import Modal from '../ui/modal/miniModal';

export default function Playground() {
    const [isBasicModalOpen, setIsBasicModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] = useState<boolean>(false);

    const handleBasicModalClose = () => setIsBasicModalOpen(false);

    const handleConfirmAction = () => {
        alert('Aksi Konfirmasi Dilakukan!');
        setIsConfirmModalOpen(false);
    };
    const handleConfirmModalClose = () => setIsConfirmModalOpen(false);

    const handleCancelAction = () => {
        alert('Aksi Pembatalan Dilakukan!');
        setIsCancelConfirmModalOpen(false);
    };
    const handleProceedAction = () => {
        alert('Aksi Lanjutkan Dilakukan!');
        setIsCancelConfirmModalOpen(false);
    };
    const handleCancelConfirmModalClose = () => setIsCancelConfirmModalOpen(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Modal</h1>

            {/* Contoh 1: Modal Dasar (tanpa tombol footer tambahan) */}
            <button
                onClick={() => setIsBasicModalOpen(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
                Buka Modal Dasar
            </button>
            <Modal
                isOpen={isBasicModalOpen}
                onClose={handleBasicModalClose}
                title="Modal Sederhana"
            >
                <p className="text-gray-700">
                    Ini adalah modal tanpa tombol "Batal" atau "Konfirmasi" di bagian bawah.
                    Anda bisa menutupnya dengan tombol X atau mengklik overlay.
                </p>
            </Modal>

            {/* Contoh 2: Modal dengan tombol Konfirmasi saja */}
            <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
                Buka Modal Konfirmasi
            </button>
            <Modal
                isOpen={isConfirmModalOpen}
                onClose={handleConfirmModalClose}
                title="Konfirmasi Aksi"
                onConfirm={handleConfirmAction}
                confirmButtonText="Lanjutkan"
            >
                <p className="text-gray-700">
                    Apakah Anda yakin ingin melanjutkan aksi ini?
                </p>
            </Modal>

            {/* Contoh 3: Modal dengan tombol Batal dan Konfirmasi */}
            <button
                onClick={() => setIsCancelConfirmModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Buka Modal Batal & Konfirmasi
            </button>

            <Modal
                isOpen={isCancelConfirmModalOpen}
                onClose={handleCancelConfirmModalClose}
                title="Peringatan Penting"
                onCancel={handleCancelAction}
                onConfirm={handleProceedAction}
                cancelButtonText="Delete"
                icon="/icons/trash-outline-red.svg"
                confirmButtonText="Edit Collection"
            >
                <p className="text-gray-700">
                    Anda akan melakukan perubahan yang signifikan. Harap tinjau kembali sebelum melanjutkan.
                </p>
            </Modal>
        </div>
    )
}