"use client";
import { disconnectAllSockets, getSocket } from "@/socket/config/socket";
import { TNamespace } from "@/socket/config/socket.config";
import React, { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContextValue {
    get: (ns?: TNamespace) => Promise<Socket>;
    disconnectAll: () => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SocketContext.Provider
            value={{
                get: (ns: TNamespace = "/") => getSocket(ns),
                disconnectAll: () => disconnectAllSockets(),
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const ctx = useContext(SocketContext);
    if (!ctx) throw new Error("useSocket must be inside SocketProvider");
    return ctx;
};
