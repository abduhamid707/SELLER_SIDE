// services/authService.ts

import BaseUrl from "./axios";

interface AuthPayload {
  phone: string;
  password: string;
  first_name?: string; // faqat registerda
}

export const register = async (data: AuthPayload) => {
  const res = await BaseUrl.post("/sellers", data);
  return res.data;
};

export const login = async (data: AuthPayload) => {
  const res = await BaseUrl.post("/sellers/login", data);
  return res.data;
};
