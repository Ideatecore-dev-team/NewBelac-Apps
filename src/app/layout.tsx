// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode, Suspense } from 'react'; // Impor Suspense dari 'react'
import dynamic from 'next/dynamic'; // Impor dynamic dari 'next/dynamic'

// Impor Navbar seperti biasa karena ini bisa jadi Server Component
import Navbar from './ui/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PROJECT REALMARK',
  description: 'Newbelac Teams',
};

// Impor komponen Providers secara dinamis
// ssr: false akan memastikan komponen ini hanya di-render di sisi klien.
const DynamicProviders = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false,
  loading: () => <div>Loading...</div>, // Opsional: Tampilkan loading state sementara
});

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* Bungkus DynamicProviders dengan Suspense */}
        <Suspense fallback={<div>Loading app...</div>}>
          <DynamicProviders>
            <Navbar />
            <div id='main-container' className='flex center w-full h-lvh bg-cover bg-center bg-fixed'>
              <div id='main-wrapper' className='mx-auto'>
                {props.children}
              </div>
            </div>
          </DynamicProviders>
        </Suspense>
      </body>
    </html>
  );
}