// services/api.ts

import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const BaseUrl = axios.create({
  baseURL: "https://abumarket.abusahiy.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

BaseUrl.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default BaseUrl;
