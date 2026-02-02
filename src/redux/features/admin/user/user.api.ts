import { apiClient } from "@/redux/apiClient/apiClient";

const userManagementApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    //Create User
    createUser: builder.mutation({
      query: (data) => {
        const result = {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
        return result;
      },
      invalidatesTags: ["User"],
    }),

    //Get All Users
    getAllUsers: builder.query({
      query: (queryParams) => {
        return {
          url: "/users",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["User"],
    }),


    //Get user Summary
    getUserSummary: builder.query({
      query: () => {
        return {
          url: "/users/user-dashboard/summary",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    //Get single Users
    getSingleUser: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    //Update User
    updateUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    //Update User Avatar
    updateUserAvatar: builder.mutation({
      query: (data) => {
        return {
          url: `/users/me/avatar`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    //Delete User
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),

    //Restore Deleted User
    restoreDeletedUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}/restore`,
          method: "POST",
        };
      },
      invalidatesTags: ["User"],
    }),

    //Get Conversation by ID
    getConversationId: builder.mutation({
      query: (recipientId) => {
        const result = {
          url: `/private-chat/create-conversationid/${recipientId}`,
          method: "POST",
        };
        return result;
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserSummaryQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useUpdateUserAvatarMutation,
  useDeleteUserMutation,
  useRestoreDeletedUserMutation,
  useGetConversationIdMutation,
} = userManagementApi;
