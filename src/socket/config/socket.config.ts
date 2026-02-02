/* eslint-disable @typescript-eslint/no-explicit-any */
export type TNamespace = "/" | "/pv/message" | "/notificationsnow" | "/activity";

export interface ISocketNamespaceConfig {
  // namespace: TNamespace;

  //auth
  requiresAuth: boolean;

  //connection options
  autoConnect?: boolean;
  transports?: ("polling" | "websocket")[];

  //reconnection
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;

  //extra (optional) options
  query?: Record<string, any>;
  extraHeaders?: Record<string, string>;
}

export const SOCKET_NAMESPACES_CONFIG: Record<
  TNamespace,
  ISocketNamespaceConfig
> = {
  "/": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
  //http://13.54.163.202:5065/pv/message
  "/pv/message": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
  "/notificationsnow": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
  "/activity": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
};
