// import { baseApi } from './../../services/root/baseApi/index';
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { logoutUser } from "@/services/auth/auth.service";
// import { getValidToken } from "@/services/root/handleToken";
// import { formatGlobalErrorResponse } from "@/utils/apiReqRes.utils";
// import {
//   BaseQueryFn,
//   createApi,
//   FetchArgs,
//   fetchBaseQuery,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { logout, setSessionExpired } from "../features/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://16.171.22.184:5050",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   console.log("========= BaseQuery =============>", result);

//   if (result.error && result.error.status === 401) {
//     console.log("Token expired, refreshing...");

//     const newToken = await getValidToken();

//     console.log("Get New Token===============>", newToken);

//     if (newToken) {
//       const currentUser = (api.getState() as RootState).auth.user;

//       api.dispatch(
//         setAuth({
//           token: newToken,
//           user: currentUser,
//         }),
//       );
//       console.log("calling with new token..........");
//       result = await baseQuery(args, api, extraOptions);
//       console.log("Result after reAuth====================>", result);
//     } else {
//       console.log("Session expired!");
//       api.dispatch(setSessionExpired(true));
//       api.dispatch(logout());
//       await logoutUser();
//     }
//   }

//   //Handle global errors formate
//   if (result.error) {
//     result.error = formatGlobalErrorResponse(result.error) as any;
//   }

//   return result;
// };

// export const apiClient = createApi({
//   reducerPath: "apiClient",
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
//   tagTypes: ["User"],
// });

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://16.171.22.184:5050",
//   credentials: "include",
//   prepareHeaders: async (headers) => {
//     const token = await getValidToken();
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   console.log("========= BaseQuery =============>", result);

//   if (result.error && result.error.status === 401) {
//     console.log("Token expired, refreshing...");

//     const newToken = await getValidToken();

//     console.log("Get New Token===============>", newToken);

//     if (newToken) {
//       // const currentUser = (api.getState() as RootState).auth.user;

//       // api.dispatch(
//       //   setAuth({
//       //     token: newToken,
//       //     user: currentUser,
//       //   }),
//       // );
//       console.log("calling with new token..........");
//       result = await baseQuery(args, api, extraOptions);
//       console.log("Result after reAuth====================>", result);
//     } else {
//       console.log("Session expired!");
//       api.dispatch(setSessionExpired(true));
//       api.dispatch(logout());
//       await logoutUser();
//     }
//   }

//   if (result.error) {
//     result.error = formatGlobalErrorResponse(result.error) as any;
//   }

//   return result;
// };

// /* ---------------- API Client ---------------- */

// export const apiClient = createApi({
//   reducerPath: "apiClient",
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
//   tagTypes: ["User"],
// });

import { logoutUser } from "@/services/auth/auth.service";
import { getValidToken } from "@/services/root/handleToken";
import { formatGlobalErrorResponse } from "@/utils/apiReqRes.utils";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logout, setSessionExpired } from "../features/auth/authSlice";

const baseApi = "http://16.171.22.184:5050";

console.log(baseApi, "=================base api==================>");

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseApi,

  // credentials: "include",
  prepareHeaders: async (headers) => {
    const token = await getValidToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("Attempting to refresh token...");
        const newToken = await getValidToken();

        if (newToken) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(setSessionExpired(true));
          api.dispatch(logout());
          await logoutUser();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (result.error) {
    result.error = formatGlobalErrorResponse(result.error) as any;
  }

  return result;
};

export const apiClient = createApi({
  reducerPath: "apiClient",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "FINANCE_INVOICE",
    "Transaction",
    "Cash",
    "Provision",
    "Tasks",
    "Folder",
    "Document",
    "Settings",
    "AuditLogs",
    "Dashboard",
    "Payments",
    "VatReturn",
    "financeDashboardOverview",
    "BankReconciliation",
    "AccrualDeferral",
    "FinanceSummary",
    "Notifications"
  ],
});
