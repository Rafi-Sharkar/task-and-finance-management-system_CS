// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';
// import { useSocket } from "@/providers/SocketProvider";
// import { useCurrentUser } from "@/redux/features/auth/authSlice";
// import { useAppSelector } from "@/redux/hooks";
// import { useEffect, useState } from "react";
// import { Socket } from "socket.io-client";

// interface Notification {
//   notificationId: string;
//   type: string;
//   title: string;
//   message: string;
//   meta: any;
//   isRead: boolean;
//   createdAt: string;
//   // ... add other fields you need
// }

// function ClientNotificationsPage() {
//   const { get } = useSocket();
//   const user = useAppSelector(useCurrentUser);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     let socket: Socket;
//     const initSocket = async () => {
//       socket = await get("/notificationsnow");

//       // Request list
//       socket.emit('notification:load', { page: 1, limit: 30 });

//       const onList = (data: { data: Notification[]; metadata: any }) => {
//         setNotifications(data.data || []);
//         setLoading(false);
//       };

//       const onNew = (notif: Notification) => {
//         setNotifications((prev) => [notif, ...prev]);
//         setUnreadCount((prev) => prev + 1);
//       };

//       const onUnreadCount = ({ count }: { count: number }) => {
//         setUnreadCount(count);
//       };

//       socket.on('notification:list', onList);
//       socket.on('notification:new', onNew);
//       socket.on('notification:unread_count', onUnreadCount);

//     };

//     if (user?.id) {
//       initSocket();
//     }

//     return () => {
//       socket?.off('notification:list');
//       socket?.off('notification:new');
//       socket?.off('notification:unread_count');
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.id]);

//   console.log("Notifiactions==========>", notifications);

//   if (!user) {
//     return <div>Please log in to see notifications</div>;
//   }
//   return (
//     // <div className="w-full overflow-hidden rounded-md bg-white">
//     //   {/* Header Section: Responsive padding and font size */}
//     //   <div className="flex items-center justify-between border-b border-[#D5D7DA] px-4 py-4 sm:px-6 sm:py-5">
//     //     <h1 className="text-lg font-semibold text-[#1E1B39] sm:text-2xl">
//     //       Notifications
//     //     </h1>
//     //     <button className="cursor-pointer text-xs font-medium text-[#155DFC] transition-colors sm:text-sm">
//     //       Mark all as read
//     //     </button>
//     //   </div>

//     //   {/* Notifications List */}
//     //   <div className="divide-y divide-[#ebeef1]">
//     //     {clientNotificationsData.map((item) => (
//     //       <div
//     //         key={item.id}
//     //         className="group flex cursor-pointer items-start justify-between px-4 py-4 transition-colors hover:bg-gray-50"
//     //       >
//     //         <div className="flex flex-1 gap-3 sm:gap-4">
//     //           {/* Status Dot */}
//     //           <div className="mt-1.5">
//     //             <div
//     //               className={`h-2 w-2 rounded-full ${item.unread ? "bg-[#155DFC]" : "bg-[#D5D7DA]"}`}
//     //             />
//     //           </div>

//     //           {/* Text Content: flex-1 ensures it takes available space */}
//     //           <div className="min-w-0 flex-1">
//     //             <h3
//     //               className={`break-word text-sm leading-tight sm:text-[15px] ${item.unread
//     //                 ? "font-semibold text-[#171717]"
//     //                 : "font-normal text-[#737373]"
//     //                 }`}
//     //             >
//     //               {item.title}
//     //             </h3>
//     //             <p className="mt-1 text-[11px] font-normal text-gray-400 sm:text-xs">
//     //               {item.type}
//     //             </p>
//     //           </div>
//     //         </div>

//     //         {/* Time: Hidden on very small screens or made smaller */}
//     //         <div className="ml-3 pt-1 text-[10px] whitespace-nowrap text-gray-400 sm:text-xs">
//     //           {item.time}
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>
//     <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-lg bg-white shadow">
//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
//         <div className="flex items-center gap-3">
//           <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
//           {unreadCount > 0 && (
//             <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
//               {unreadCount}
//             </span>
//           )}
//         </div>

//         <button
//           // onClick={markAllAsRead}
//           disabled={unreadCount === 0}
//           className="rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50"
//         >
//           Mark all as read
//         </button>
//       </div>

//       {/* List */}
//       {loading ? (
//         <div className="p-8 text-center text-gray-500">Loading notifications...</div>
//       ) : notifications.length === 0 ? (
//         <div className="p-12 text-center text-gray-500">No notifications yet</div>
//       ) : (
//         <div className="divide-y divide-gray-100">
//           {notifications.map((item) => (
//             <div
//               key={item.notificationId}
//               // onClick={() => !item.isRead && markAsRead(item.notificationId)}
//               className={`group flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-gray-50 ${!item.isRead ? 'bg-blue-50/40' : ''
//                 }`}
//             >
//               {/* Dot */}
//               <div className="mt-2">
//                 <div
//                   className={`h-2.5 w-2.5 rounded-full ${!item.isRead ? 'bg-blue-600' : 'bg-gray-300'
//                     }`}
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex-1 min-w-0">
//                 <h3
//                   className={`text-[15px] leading-tight ${!item.isRead
//                     ? 'font-semibold text-gray-900'
//                     : 'font-medium text-gray-700'
//                     }`}
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-600 line-clamp-2">
//                   {item.message}
//                 </p>
//                 <p className="mt-1 text-xs text-gray-400">
//                   {new Date(item.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ClientNotificationsPage;



const ClientNotificationsPage = () => {
  return (
    <div>ClientNotificationsPage</div>
  )
}

export default ClientNotificationsPage