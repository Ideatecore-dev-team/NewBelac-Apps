'use client'
import React, { useState } from 'react';
import Modal from '../ui/modal/miniModal';
import { TextButton, IconButton, IconTextButton } from '../ui/button';
import { BaseTextbox, LegendTextbox } from '../ui/textbox';

export default function Playground() {

    // All
    const handleClickCopotCopot = () => {
        alert('Eh Copot Copot!!');
    }

    // Modal
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

    // Textbox
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Contoh validasi sederhana untuk demo "Alert"
        if (!e.target.value.includes('@')) {
            setErrorMessage('Email tidak valid');
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-5">

            <div id="textbox-wrapper" className='w-full space-y-3'>
                <h1 className="text-2xl font-bold">Text Box</h1>

                <div className="space-x-5">
                    <BaseTextbox
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Base Textbox"
                        size="M"
                    />

                    <BaseTextbox
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email Texbox"
                        size="M"
                        color={errorMessage ? "Alert" : "Netral"} // Warna "Alert" jika ada error
                        type="email"
                    />
                    {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}


                    <BaseTextbox
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password Textbox"
                        type="password"
                        size="M"
                    />

                    <BaseTextbox
                        value="Readonly Textbox Large"
                        readOnly
                        size="L"
                        color="Netral"
                    />

                    <BaseTextbox
                        value="Disabled Textbox Small"
                        disabled
                        size="S"
                        color="Netral"
                    />

                    <BaseTextbox
                        value="Textbox Extra Small"
                        size="XS"
                        color="Netral"
                    />
                </div>

                <div className='space-y-5'>
                    {/* Contoh LegendTextbox - Posisi Top */}
                    <div className="w-full max-w-md">
                        <LegendTextbox
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukan Email"
                            legendText="Legend Atas"
                            legendPosition="top"
                            size="M"
                            type="email"
                        // color={email.includes('@') ? "Netral" : "Alert"} // Contoh validasi
                        />
                        {!email.includes('@') && email && (
                            <p className="text-red-400 text-sm mt-1">Format email tidak valid.</p>
                        )}
                    </div>

                    {/* Contoh LegendTextbox - Posisi Left */}
                    <div className="w-full max-w-md">
                        <LegendTextbox
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama Lengkap"
                            legendText="Legend Kiri:"
                            legendPosition="left"
                            size="M"
                            color="Netral"
                        />
                    </div>
                </div>
            </div>

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