import { apiClient } from "@/redux/apiClient/apiClient";

const userAndEmployeesManagementApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    //Get All Users And Employees
    getAllUsersAndEmployees: builder.query({
      query: (queryParams) => {
        return {
          url: "/users/employees",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersAndEmployeesQuery } =
  userAndEmployeesManagementApi;
