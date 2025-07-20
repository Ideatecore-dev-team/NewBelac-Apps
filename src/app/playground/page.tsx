'use client'
import React, { useState } from 'react';
import Modal from '../ui/modal/miniModal';
import { TextButton, IconButton, IconTextButton } from '../ui/button';

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

    const handleClickCopotCopot = () => {
        alert('Eh Copot Copot!!');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-5">

            <div id="modal-wrapper" className='w-full space-y-3'>
                <h1 className="text-2xl font-bold">Modal</h1>

                {/* Contoh 1: Modal Dasar (tanpa tombol footer tambahan) */}
                <TextButton
                    onClick={() => setIsBasicModalOpen(true)}
                    label="Base Modal"
                    size="M"
                />
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
                <TextButton
                    onClick={() => setIsConfirmModalOpen(true)}
                    label="Confirm Modal"
                    size="M"
                />
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
                <TextButton
                    onClick={() => setIsCancelConfirmModalOpen(true)}
                    label="Cancel and Confirm Modal"
                    size="M"
                />

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


            <div id="button-wrapper" className='w-full space-y-3'>
                <h1 className="text-2xl font-bold">Button</h1>
                <IconButton
                    onClick={() => handleClickCopotCopot()}
                    icon="/icons/pencil-outline.svg"
                    alt="edit-collection"
                    size='M'
                />

                <IconTextButton
                    size='M'
                    label={"Icon with Text"}
                    icon="/icons/pencil-outline.svg"
                    onClick={() => handleClickCopotCopot()}
                />

                <TextButton
                    withoutOutline
                    label="Without Outline"
                    size='L'
                    onClick={() => handleClickCopotCopot()}
                />

                <TextButton
                    label="Large with Text Netral"
                    size='L'
                    onClick={() => handleClickCopotCopot()}
                />
                <TextButton
                    label="Medium with Text Alert"
                    color='Alert'
                    size='M'
                    onClick={() => handleClickCopotCopot()}
                />
                <TextButton
                    label="Small with Text Netral"
                    size='S'
                    onClick={() => handleClickCopotCopot()}
                />
                <TextButton
                    label="Extra Small with Text Netral"
                    size='XS'
                    onClick={() => handleClickCopotCopot()}
                />
            </div>
        </div>
    )
}