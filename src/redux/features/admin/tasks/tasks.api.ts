import { apiClient } from "@/redux/apiClient/apiClient";

export const tasksApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getMyTasks: builder.query({
      query: (queryParams) => ({
        url: "/tasks/my-tasks",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Tasks"],
    }),

    getTaskSummary: builder.query({
      query: () => ({
        url: "/tasks/task-dashboard/summary",
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),

    getTasksAssignedToMe: builder.query({
      query: (queryParams) => ({
        url: "/tasks/assigned-to-me",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ taskId, ...data }) => ({
        url: `/tasks/${taskId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateAssignmentStatus: builder.mutation({
      query: ({ assignmentId, status }) => ({
        url: `/tasks/assignment/${assignmentId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useGetTaskSummaryQuery,
  useGetTasksAssignedToMeQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateAssignmentStatusMutation,
} = tasksApi;
