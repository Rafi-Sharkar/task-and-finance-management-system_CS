/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";

import { getValidToken } from "@/services/root/handleToken";
import { SOCKET_NAMESPACES_CONFIG, TNamespace } from "./socket.config";

const SOCKET_URL = "http://16.171.22.184:5050";

const socketInstances: Partial<Record<TNamespace, Socket>> = {};
const socketPromises: Partial<Record<TNamespace, Promise<Socket>>> = {};

export const getSocket = async (namespace: TNamespace = "/"): Promise<Socket> => {
  // Case 1: Already fully connected → direct return
  if (socketInstances[namespace]?.connected) {
    console.log(`[getSocket] Returning fully connected socket: ${namespace}`);
    return socketInstances[namespace]!;
  }

  // Case 2: Promise already running → wait for it (prevents duplicates)
  if (socketPromises[namespace]) {
    console.log(`[getSocket] Waiting on existing creation promise: ${namespace}`);
    try {
      const socket = await socketPromises[namespace];
      // Wait until it's actually connected if needed
      if (!socket.connected) {
        await new Promise<void>((resolve) => {
          const onConnect = () => {
            socket.off("connect", onConnect);
            resolve();
          };
          socket.on("connect", onConnect);
          // Safety timeout
          setTimeout(() => {
            socket.off("connect", onConnect);
            resolve();
          }, 5000);
        });
      }
      return socket;
    } catch (err) {
      console.error("Promise failed, will retry creation", err);
      // Clean up failed promise
      delete socketPromises[namespace];
    }
  }

  // Case 3: Create new
  console.log(`[getSocket] Starting new socket creation: ${namespace}`);

  const creationPromise = (async () => {
    try {
      const config = SOCKET_NAMESPACES_CONFIG[namespace];
      const url = namespace === "/" ? SOCKET_URL : `${SOCKET_URL}${namespace}`;

      const socket = io(url, {
        ...config,
        autoConnect: false,
      });

      if (config.requiresAuth) {
        const token = await getValidToken();
        if (token) socket.auth = { token: `Bearer ${token}` };
      }

      // Important: connect করার পর connected হওয়া পর্যন্ত অপেক্ষা করা যায় (optional but helpful)
      const connectPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Connect timeout")), 10000);
        socket.on("connect", () => {
          clearTimeout(timeout);
          resolve();
        });
        socket.on("connect_error", (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      socket.connect();

      // Wait for connect (prevents race where connected=false)
      await connectPromise.catch((err) => {
        console.warn(`Connect failed during creation: ${namespace}`, err);
      });

      // Attach common listeners
      socket.on("disconnect", (reason) => console.warn(`[${namespace}] disconnected: ${reason}`));
      socket.on("connect_error", async (err: any) => {
        console.error(`[${namespace}] connect_error:`, err.message);
        if (err.message?.includes("TOKEN")) {
          const newToken = await getValidToken();
          if (newToken) {
            socket.auth = { token: newToken };
            socket.connect();
          }
        }
      });

      socketInstances[namespace] = socket;
      console.log(`[getSocket] Created & connected: ${namespace} → ${socket.id}`);

      return socket;
    } finally {
      delete socketPromises[namespace];
    }
  })();

  socketPromises[namespace] = creationPromise;

  return creationPromise;
};

/* ---------------- helpers ---------------- */

// Disconnect single namespace
export const disconnectSocket = (ns: TNamespace) => {
  socketInstances[ns]?.disconnect();
};

// Disconnect all sockets
export const disconnectAllSockets = () => {
  Object.values(socketInstances).forEach((s) => s.disconnect());
};
