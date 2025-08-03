// app/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useMemo, ReactNode, FC, useEffect } from "react";
import {
    useAccount,
    useBalance,
    useConnect,
    useDisconnect,
    useSwitchChain,
    useReadContract,
    useReadContracts,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'; // Hapus 'redirect' dari sini
import { LSK_TOKEN_ADDRESS } from "@/constants";

function useAuthValue() {
    const { address, status, isConnected, chainId, isReconnecting, isDisconnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { connectors, connect } = useConnect();
    const { switchChain } = useSwitchChain();
    const { error: writeContractError, data: dataWriteContract, writeContract, isPending: writeContractIsPending, writeContractAsync } = useWriteContract();

    // Hooks yang hanya bisa di client-side
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();

    const lastPath = `${pathName}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

    useEffect(() => {
        if (!isConnected && pathName !== "/") {
            router.push('/'); // Menggunakan router.push untuk client-side
        } else if (isConnected) {
            router.push(lastPath);
        }
    }, [isConnected, pathName, router, lastPath]); // Tambahkan dependensi lengkap

    useEffect(() => {
        if (pathName !== "/") {
            localStorage.setItem('lastPath', lastPath);
        }
    }, [pathName, lastPath]); // Tambahkan dependensi lengkap

    // ... sisa kode lainnya
    const { data: nativeBalanceData, isLoading: isNativeLoading } = useBalance({ address });
    const { data: lskBalanceData, isLoading: isLskLoading } = useBalance({ address, token: LSK_TOKEN_ADDRESS });
    const isLoading = isNativeLoading || isLskLoading;

    return useMemo(() => ({
        address, status, nativeBalanceData, lskBalanceData, isLoading, disconnect,
        connectors, connect, isConnected, chainId, switchChain, useReadContracts,
        useReadContract, writeContract, dataWriteContract, writeContractIsPending,
        useWaitForTransactionReceipt, writeContractError, writeContractAsync, lastPath
    }), [
        address, status, nativeBalanceData, lskBalanceData, isLoading, disconnect,
        connectors, connect, isConnected, chainId, switchChain, useReadContracts,
        useReadContract, writeContract, dataWriteContract, writeContractIsPending,
        useWaitForTransactionReceipt, writeContractError, writeContractAsync, lastPath
    ]);
}

type AuthContextType = ReturnType<typeof useAuthValue>;
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const value = useAuthValue();
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};