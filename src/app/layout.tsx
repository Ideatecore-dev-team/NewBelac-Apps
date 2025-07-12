import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'
import { Providers } from './providers'
import Navbar from './ui/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PROJECT REALMARK',
  description: 'Newbelac Teams',
}

// Layout ini sekarang bersih dari logic client-side
export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Cukup bungkus dengan Providers tanpa prop apa pun */}
        <Providers>
          <Navbar />
          <div id='main-container' className='flex center w-full h-lvh'>
            <div id='main-wrapper' className='mx-auto'>
              {props.children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
