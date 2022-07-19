import axios, { AxiosError } from "axios";
import { store } from "..";
import { getTokenLS } from "../reducers/helpers/localStorage";
import { updateError } from "./auth";

const { dispatch } = store;

const axiosInstance: any = axios.create({ baseURL: "http://localhost:3500" });
axiosInstance.interceptors.request.use((request: any) => {
  request.headers.authorization = getTokenLS();
  return request;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: AxiosError) => {
    dispatch(updateError("Something went wrong!"))
    localStorage.clear()
    return Promise.reject(error);
  }
);

export default axiosInstance;
