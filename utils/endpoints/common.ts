import ShowToast from "../../Components/Common/ShowToast";
import defaultAxios from "../api/axios";

const fail = (err: any) => {
  if (err?.code !== "ERR_NETWORK") {
    ShowToast(err?.response?.data?.error || err?.message || "Something went wrong.", "error");
  }
  return null;
};

export const apiGet = async (url: string, params?: Record<string, any>) => {
  try {
    return (await defaultAxios.get(url, { params })).data;
  } catch (e) {
    return fail(e);
  }
};

export const apiPatch = async (url: string, values: any) => {
  try {
    return (await defaultAxios.patch(url, values)).data;
  } catch (e) {
    return fail(e);
  }
};

// FormData: let axios set the multipart boundary itself
export const apiPostForm = async (url: string, values: FormData) => {
  try {
    return (await defaultAxios.post(url, values)).data;
  } catch (e) {
    return fail(e);
  }
};

export const apiDelete = async (url: string) => {
  try {
    return (await defaultAxios.delete(url)).data;
  } catch (e) {
    return fail(e);
  }
};
