import { ENV } from "@/shared/config/env";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
