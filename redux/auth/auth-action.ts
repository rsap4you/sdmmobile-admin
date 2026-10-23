import axios from "../../utils/api/axios";
import { API_LOGIN } from "@/utils/api/APIConstant";
import {
  onLoginFailed,
  onLoginRequest,
  onLoginSuccess,
  onLogoutSuccess,
} from "./authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ShowToast from "../../Components/Common/ShowToast";

interface LoginParams {
  values: { password: string };
  navigate: any;
  dispatch: any;
}

// Backend: POST /admin/login { password } -> { token }
export const LoginUser = createAsyncThunk(
  "login",
  async ({ values, navigate, dispatch }: LoginParams) => {
    try {
      dispatch(onLoginRequest());
      const res = await axios.post(API_LOGIN, { password: values.password });
      if (res.data?.token) {
        dispatch(onLoginSuccess({ data: { token: res.data.token, name: "Admin" } }));
        navigate.push("/dashboard");
        ShowToast("Login successful", "success");
      } else {
        dispatch(onLoginFailed());
        ShowToast("Login failed", "error");
      }
      return res.data;
    } catch (err: any) {
      dispatch(onLoginFailed());
      if (err?.code !== "ERR_NETWORK") {
        ShowToast(err?.response?.data?.error || "Login failed", "error");
      }
      return err?.response?.data;
    }
  }
);

// The backend has no logout endpoint, so logging out just clears the local token
export const userLogout = createAsyncThunk(
  "logout",
  async ({ dispatch, navigate }: { dispatch: any; navigate: any }) => {
    dispatch(onLogoutSuccess());
    navigate.push("/");
    ShowToast("Logged out", "success");
  }
);
