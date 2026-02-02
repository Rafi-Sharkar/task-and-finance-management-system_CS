/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSocket } from "@/providers/SocketProvider";
import { useIsAuthenticated } from "@/redux/features/auth/authSlice";
import { addNotification, setSocketConnected } from "@/redux/features/notification/notification.slice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const GlobalSocketConnector = () => {
  const isAuthenticated = useSelector(useIsAuthenticated);
  const { get, disconnectAll } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const connectSockets = async () => {
      const chatSocket = await get("/pv/message");
      await get("/activity");
      const notificationSocket = await get("/notificationsnow");

      if (chatSocket) {
        chatSocket.on("private:success", (data) =>
          console.log("✅ [pv/message] connected From Server", data),
        );
      }

      if (notificationSocket.connected) {
        dispatch(setSocketConnected(true));
        // ------------------ Listen for USER REGISTRATION events ---------------------------
        notificationSocket.on("user.create", (data: any) => {
          // console.log("📬 New user registration notification:", data);
          const notification = {
            id: `${Date.now()}-${Math.random()}`,
            notificationId: data.meta?.id || `notif-${Date.now()}`,
            type: data.type,
            title: data.title,
            message: data.message,
            createdAt: new Date(data.createdAt).toISOString(),
            read: false,
            meta: data.meta,
          };
          dispatch(addNotification(notification));
        });
      }


    };

    if (isAuthenticated) {
      connectSockets();
    } else {
      // logout / unauth → clean disconnect
      disconnectAll();
    }
  }, [isAuthenticated, get, disconnectAll, dispatch]);

  return null;
};

export default GlobalSocketConnector;
