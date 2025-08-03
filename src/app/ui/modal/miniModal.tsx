'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconTextButton, TextButton } from '../button';

// ✅ Tambahkan disableConfirm ke interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  icon?: string;
  bgColour?: string;
  disableConfirm?: boolean; // <-- ✅ Tambahan di sini
}

const MiniModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  onCancel,
  onConfirm,
  cancelButtonText = 'Batal',
  confirmButtonText = 'Konfirmasi',
  icon = '',
  bgColour = 'bg-[#1c1c1c]',
  disableConfirm = false // <-- ✅ Default false
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

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
        className={`relative w-auto max-w-lg mx-auto my-6 p-6 rounded-lg shadow-lg outline-1 outline-offset-[-1px] outline-[#2c2c2c]
        ${bgColour}
        transform transition-all sm:my-8 sm:p-8`}
        tabIndex={-1}
        aria-live="assertive"
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

        {/* Footer */}
        {(onCancel || onConfirm) && (
          <div className="flex justify-end space-x-3">
            {onCancel && (
              <div className="content-center">
                {icon !== '' ? (
                  <IconTextButton
                    color="Alert"
                    withoutOutline
                    size="M"
                    label={cancelButtonText}
                    icon={icon}
                    onClick={onCancel}
                  />
                ) : (
                  <TextButton
                    color="Alert"
                    withoutOutline
                    size="M"
                    label={cancelButtonText}
                    onClick={onCancel}
                  />
                )}
              </div>
            )}
            {onConfirm && (
              <div className="content-center">
                <TextButton
                  size="M"
                  label={confirmButtonText}
                  onClick={onConfirm}
                  disabled={disableConfirm} // ✅ Tombol confirm bisa di-disable
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default MiniModal;
