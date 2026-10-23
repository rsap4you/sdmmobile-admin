import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { store } from "../../redux/store";
import { APIBaseUrl } from "../constance";
import { API_LOGIN } from "./APIConstant";
import ShowToast from "../../Components/Common/ShowToast";

export const PERSIST_KEY = "persist:admin_sdm";

const defaultAxios = axios.create({ baseURL: APIBaseUrl });

defaultAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { token } = store.getState()?.auth;
  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders();
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

defaultAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogin = error.config?.url === API_LOGIN;

    // Token missing/expired -> back to login (but not for a wrong password on the login form)
    if (error.response?.status === 401 && !isLogin) {
      ShowToast("Session expired. Please log in again.", "error");
      localStorage.removeItem(PERSIST_KEY);
      window.location.href = "/";
    }
    // Network errors (e.g. Render free tier waking up) must NOT log the admin out
    if (error.code === "ERR_NETWORK") {
      ShowToast("Cannot reach the server. If it was idle, wait a few seconds and try again.", "error");
    }
    return Promise.reject(error);
  }
);

export default defaultAxios;
