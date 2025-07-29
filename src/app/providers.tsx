'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { AuthProvider } from '../app/contexts/AuthContext';
import { config } from '@/wagmi'

// Komponen ini tidak lagi menerima initialState
export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {props.children}
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

