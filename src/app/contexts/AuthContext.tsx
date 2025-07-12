// app/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useMemo, ReactNode, FC } from "react";
import { useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from "wagmi";

const LSK_TOKEN_ADDRESS = '0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D';

function useAuthValue() {
    const { address, status, chainId } = useAccount();
    const { disconnect } = useDisconnect();
    const { connectors, connect } = useConnect();
    const { switchChain } = useSwitchChain(); 

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