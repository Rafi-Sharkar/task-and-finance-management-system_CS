/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/redux/apiClient/apiClient";
import { NotificationResponse } from "@/types/notification.types";

const userManagementApi = apiClient.injectEndpoints({
    endpoints: (builder) => ({

        getUserNotifications: builder.query<NotificationResponse, void>({
            query: () => "/notification-setting/user-specific-notification",
            providesTags: ["Notifications"],
        }),
        markNotificationAsRead: builder.mutation<any, string>({
            query: (notificationId) => ({
                url: `/notification-setting/mark-read/${notificationId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),
        markAllNotificationsAsRead: builder.mutation<any, void>({
            query: () => ({
                url: "/notification-setting/mark-all-read",
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),
        deleteNotification: builder.mutation<any, string>({
            query: (notificationId) => ({
                url: `/notification-setting/${notificationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notifications"],
        }),
        getUnreadCount: builder.query<
            { success: boolean; data: { count: number } },
            void
        >({
            query: () => "/notification-setting/unread-count",
            providesTags: ["Notifications"],
        }),
    }),
});

export const {
    useGetUserNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useDeleteNotificationMutation,
    useGetUnreadCountQuery,
} = userManagementApi;
