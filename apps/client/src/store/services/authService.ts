import axios from "axios";
import axiosInstance from "../asyncFunctions/index.axios";
const baseUrl = `http://localhost:3500/auth`;
export interface ILoginPayload {
  user_site_username: string;
  user_password: string;
}
export interface ILoginResponse {
  token: string;
  message: string;
}
export async function loginService(payload: ILoginPayload) {
  const { data } = await axios.post(`${baseUrl}/login`, payload);
  return data;
}
export async function registerService(payload: any): Promise<any> {
  const { data } = await axios.post(`${baseUrl}/register`, payload);
  return data;
}
export async function logoutService(): Promise<any> {
  const { data } = await axiosInstance.get(`${baseUrl}/logout`);
  return data;
}
