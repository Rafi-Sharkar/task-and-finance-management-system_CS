// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use server";

// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";

// //Get New Token
// export const getNewToken = async () => {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   if (!refreshToken) {
//     throw new Error("No refresh token found");
//   }
//   try {
//     const res = await fetch(
//       `${"http://16.171.22.184:5050"}/auth/refresh-token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refreshToken }),
//       },
//     );
//     const result = await res.json();

//     console.log("Get New Token Function ===========>", result);
//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const isTokenExpired = async (token: string): Promise<boolean> => {
//   if (!token) return true;

//   try {
//     const decoded: { exp: number } = jwtDecode(token);

//     return decoded.exp * 1000 < Date.now();
//   } catch (err: any) {
//     console.error(err);
//     return true;
//   }
// };

// export const getValidToken = async (): Promise<string | null> => {
//   const cookieStore = await cookies();

//   const tokenCookie = cookieStore.get("accessToken");

//   if (!tokenCookie) {
//     console.log("No access token found in cookies");
//     return null;
//   }

//   let token = tokenCookie.value;

//   if (!token || (await isTokenExpired(token))) {
//     console.log("Token expired, refreshing...");
//     const res = await getNewToken();
//     console.log("Data from Get Valid Token", res);
//     token = res?.data?.accessToken;
//     if (token) {
//       cookieStore.set("accessToken", token);
//       cookieStore.set("refreshToken", res?.data?.refreshToken);
//     }
//   }

//   return token || null;
// };

"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getNewToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  try {
    const res = await fetch(
      `${"http://16.171.22.184:5050"}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!res.ok) return null;
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return null;
  }
};

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 - 60000 < Date.now();
  } catch {
    return true;
  }
};

export const getValidToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  let token = cookieStore.get("accessToken")?.value;

  if (!token || (await isTokenExpired(token))) {
    console.log("Token expired or missing, refreshing...");
    const res = await getNewToken();

    if (res?.data?.accessToken) {
      token = res.data.accessToken;
      cookieStore.set("accessToken", token as string);
      if (res.data.refreshToken) {
        cookieStore.set("refreshToken", res.data.refreshToken as string);
      }
      return token!;
    } else {
      return null;
    }
  }

  return token;
};
