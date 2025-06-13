// services/sellerService.ts

import BaseUrl from "./axios";

export interface SellerPayload {
  id: number;
  first_name: string;
  second_name: string | null;
  middle_name: string | null;
  phone: string;
  extra_phone: string | null;
  forbid_login: number;
  passport_serial_no: string | null;
  passport_no: string | null;
  register_passport_no: string | null;
  register_passport_images: string | null;
  birth_date: string | null;
  register_date: string | null;
  passport_images: string | null;
  jshshir: string | null;
  email: string | null;
  address: string | null;
  avatar: string | null;
  status: number;
  b2b_user_id: number | null;
  created_at: string | null;
  last_login_at: string | null;
  _: string;
}

export const updateSeller = async (id: number, data: SellerPayload) => {
  const response = await BaseUrl.put(`/seller/${id}`, data);
  return response.data;
};
