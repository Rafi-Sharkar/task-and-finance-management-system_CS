"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { baseApi } from "../root/baseApi";

// Register User
export const registerUser = async (userData: FieldValues) => {
  const result = await baseApi("/auth/registration/complete", {
    method: "POST",
    data: userData,
  });
  return result;
};

//Verify Email
export const verifyEmail = async (verifyData: FieldValues) => {
  // const cookieStore = await cookies();
  const result = await baseApi("/auth/registration/verify-otp", {
    method: "POST",
    data: verifyData,
  });
  // if (result?.success) {
  //   cookieStore.set("accessToken", result?.data?.accessToken);
  //   cookieStore.set('user', JSON.stringify(result?.data?.user));
  // }
  return result;
};

//Login User
export const loginUser = async (userData: FieldValues) => {
  const cookieStore = await cookies();

  const result = await baseApi("/auth/login", {
    method: "POST",
    data: userData,
  });
  console.log("Result from login", result);
  const userInfo = {
    id: result?.data?.user?.id,
    email: result?.data?.user?.email,
    username: result?.data?.user?.username,
    fullName: result?.data?.user?.fullName,
    role: result?.data?.user?.role,
    profilePicture: result?.data?.user?.avatarUrle,
    phone: result?.data?.user?.phone,
    accountStatus: result?.data?.user?.accountStatus,
  };

  if (result?.success) {
    cookieStore.set("accessToken", result?.data?.accessToken);
    cookieStore.set("user", JSON.stringify(userInfo));
    cookieStore.set("refreshToken", result?.data?.refreshToken);
  }

  return result;
};

//send OTP
export const sendOtp = async (userData: FieldValues) => {
  const result = await baseApi("/auth/registration/send-otp", {
    method: "POST",
    data: userData,
  });
  return result;
};

//Forget Password
export const forgetPassword = async (data: FieldValues) => {
  const result = await baseApi("/auth/forgot-password", {
    method: "POST",
    data: data,
  });
  return result;
};
export const resetPassword = async (data: FieldValues) => {
  const result = await baseApi(`/auth/reset-password`, {
    method: "POST",
    data: data,
  });
  return result;
};

//Update Temporary Password
export const updateTemporaryPassword = async (data: FieldValues) => {
  const result = await baseApi("/auth/update-password", {
    method: "POST",
    data: data,
  });
  return result;
};

export const loginWithGoogle = async () => {
  const result = await baseApi("/auth/google", {
    method: "GET",
  });
  return result;
};

//Gwt Access Token using Refresh Token
export const refreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const result = await baseApi("/auth/refresh", {
    method: "POST",
    data: { refreshToken },
  });
  if (result?.success) {
    cookieStore.set("accessToken", result?.data?.accessToken);
  }
  console.log("verify refresh", result);
  return result;
};

//Get Current User
export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userCookie = cookieStore.get("user")?.value;

  if (accessToken && userCookie) {
    try {
      const user = JSON.parse(userCookie);
      return { ...user, accessToken };
    } catch (err) {
      console.error("Error parsing user cookie:", err);
      return null;
    }
  }

  return null;
};

//Logout user
export const logoutUser = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  cookiesStore.delete("refreshToken");
  cookiesStore.delete("user");
};

export const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken);
};
export const setUserProfile = async (user: string) => {
  const cookieStore = await cookies();
  cookieStore.set("user", JSON.stringify(user));
};
