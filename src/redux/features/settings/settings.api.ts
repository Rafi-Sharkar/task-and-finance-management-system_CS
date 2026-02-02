import { apiClient } from "@/redux/apiClient/apiClient";

export const settingsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAllSettings: builder.query({
      query: (queryParams) => ({
        url: "/settings",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Settings"],
    }),

    updateSettings: builder.mutation({
      query: (updateData) => ({
        url: `/settings`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetAllSettingsQuery, useUpdateSettingsMutation } =
  settingsApi;
