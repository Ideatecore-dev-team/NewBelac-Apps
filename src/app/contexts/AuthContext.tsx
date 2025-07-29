// app/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useMemo, ReactNode, FC, useEffect } from "react";
import {
    useAccount,
    useBalance,
    useConnect,
    useDisconnect,
    useSwitchChain,
    useWriteContract,
    useWaitForTransactionReceipt
} from "wagmi";
import { redirect, usePathname } from 'next/navigation';
import { config } from "../../wagmi";

const LSK_TOKEN_ADDRESS = '0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D';

function useAuthValue() {
    const { address, status, isConnected, chainId, chain } = useAccount();
    const { disconnect } = useDisconnect();
    const { connectors, connect, } = useConnect();
    const { switchChain } = useSwitchChain();
    const { error: writeContractError, data: dataWriteContract, writeContract, isPending: writeContractIsPending } = useWriteContract();
    const pathName = usePathname();

    useEffect(() => {
        if (status !== 'connected' && pathName !== "/") {
            redirect('/')
        }
    }, [status])

    const {
        data: nativeBalanceData,
        isLoading: isNativeLoading
    } = useBalance({ address });

    const {
        data: lskBalanceData,
        isLoading: isLskLoading
    } = useBalance({
        address,
        token: LSK_TOKEN_ADDRESS,
    });

    const isLoading = isNativeLoading || isLskLoading;

    return useMemo(() => ({
        address,
        status,
        nativeBalanceData, // ETH
        lskBalanceData,    // LSK
        isLoading,
        disconnect,
        connectors,
        connect,
        chainId,
        switchChain,
        writeContract,
        dataWriteContract,
        writeContractIsPending,
        isConnected,
        useWaitForTransactionReceipt,
        writeContractError
    }), [
        address,
        status,
        nativeBalanceData,
        lskBalanceData,
        isLoading,
        disconnect,
        connectors,
        connect,
        chainId,
        switchChain,
        writeContract,
        dataWriteContract,
        writeContractIsPending,
        isConnected,
        useWaitForTransactionReceipt,
        writeContractError
    ]);
}
type AuthContextType = ReturnType<typeof useAuthValue>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const value = useAuthValue();
    console.log('use auth value', value)
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};