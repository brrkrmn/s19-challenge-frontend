import axios from "axios";

export const backendService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});