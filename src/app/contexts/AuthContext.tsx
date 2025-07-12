"use client";

import { createContext, useContext, useMemo, ReactNode, FC } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

function useAuthValue() {
    const { address, status } = useAccount();
    const { data: balanceData, isLoading } = useBalance({ address });
    const { disconnect } = useDisconnect();
    const { connectors, connect } = useConnect();


    return useMemo(() => ({
        address,
        status,
        balanceData,
        isLoading,
        disconnect,
        connectors,
        connect,
    }), [address, status, balanceData, isLoading, disconnect, connectors, connect]);
}

type AuthContextType = ReturnType<typeof useAuthValue>;

//defaulnya kubuat null
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