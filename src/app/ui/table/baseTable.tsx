// components/Table/Table.tsx
'use client'; // Karena ini akan menjadi komponen interaktif atau menampilkan data dinamis dari klien

import React from 'react';


// Tipe generik untuk baris data
export type TableRowData = {
    [key: string]: any; // Memungkinkan properti apa pun
    // Anda bisa lebih spesifik di sini jika tahu properti umum
    // id: string | number;
    // name: string;
};

// Tipe untuk definisi kolom
export interface TableColumn<T extends TableRowData> {
    key: keyof T | string; // Kunci dari data baris atau string kustom
    header: string; // Teks header yang akan ditampilkan
    // Fungsi opsional untuk merender sel secara kustom
    render?: (row: T, key: keyof T | string) => React.ReactNode;
    headerClassName?: string; // Kelas Tailwind untuk header kolom
    cellClassName?: string; // Kelas Tailwind untuk sel kolom
}

interface TableProps<T extends TableRowData> {
    data: T[]; // Array data untuk baris tabel
    columns: TableColumn<T>[]; // Definisi kolom tabel
    tableClassName?: string; // Kelas opsional untuk tabel utama
    headerClassName?: string; // Kelas opsional untuk baris header
    rowClassName?: string | ((row: T, index: number) => string); // Kelas opsional untuk baris data
    emptyMessage?: string; // Pesan yang ditampilkan jika data kosong
}

// Gunakan React.FC generik untuk mendukung tipe T
function Table<T extends TableRowData>({
    data,
    columns,
    tableClassName = 'min-w-full divide-y divide-gray-700', // Default styling
    headerClassName = '', // Default styling
    rowClassName,
    emptyMessage = 'Tidak ada data yang tersedia.',
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto shadow-md text-gray-300">
            <table className={`${tableClassName}`}>
                <thead className={`${headerClassName}`}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                scope="col"
                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${column.headerClassName || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={`row-${rowIndex}`} // Kunci unik untuk setiap baris
                                className={
                                    typeof rowClassName === 'function'
                                        ? rowClassName(row, rowIndex)
                                        : rowClassName || 'hover:bg-gray-800' // Default hover
                                }
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${String(column.key)}-${rowIndex}`} // Kunci unik untuk setiap sel
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${column.cellClassName || ''}`}
                                    >
                                        {column.render ? column.render(row, column.key) : String(row[column.key])}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;