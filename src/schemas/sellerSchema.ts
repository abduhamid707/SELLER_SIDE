// src/schemas/sellerSchema.ts
import { z } from "zod";

export const sellerSchema = z.object({
    first_name: z.string().min(3, "Ism 3 harfdan kam bo‘lmasligi kerak").max(15, "Ism 15 harfdan oshmasligi kerak"),
    second_name: z.string().min(3, "Familiya 3 harfdan kam bo‘lmasligi kerak").max(20, "Familiya 20 harfdan oshmasligi kerak"),
    middle_name: z.string().min(3, "Otasining ismi kamida 3 harf"),
    email: z.string().email("Email noto‘g‘ri formatda"),
    extra_phone: z.string().regex(/^\d{9}$/, "Telefon raqam formati: 901234567"),
    address: z.string().min(5, "Manzil juda qisqa"),
    passport_serial_no: z.string().regex(/^[A-Z]{2}$/, "2 ta katta harf (masalan, AA)"),
    passport_no: z.string().regex(/^\d{7}$/, "7 xonali raqam"),
    jshshir: z.string().regex(/^\d{14}$/, "JSHSHIR 14 xonali raqam bo‘lishi kerak"),
    birth_date: z.string().min(1, "Tug‘ilgan sana kerak"),
    register_date: z.string().min(1, "Ro‘yxatdan o‘tgan sana kerak"),
    register_passport_no: z.string().min(5, "Passport seriya raqami juda qisqa"),
    card_number: z.string().regex(/^\d{16}$/, "Karta raqami 16 xonali bo‘lishi kerak"),
    card_holder: z.string().min(3, "Karta egasining ismi juda qisqa").max(30, "Karta egasining ismi juda uzun"),
});

export type SellerFormSchema = z.infer<typeof sellerSchema>;




export const shopSchema = z.object({
  name: z.string().min(2, "Do‘kon nomi kamida 2 harf bo‘lishi kerak."),
  url: z.string().min(3, "URL kamida 3 belgidan iborat bo‘lishi kerak."),
  image: z.string().url("Rasm URL noto‘g‘ri."),
  details_uz: z.string().min(3, "Tavsif (uz) to‘ldirilishi shart."),
  details_ru: z.string().optional(),
});

export const productSchema = z.object({
  productNameUz: z.string().min(2, "Mahsulot nomi (UZ) kamida 2 ta harfdan iborat bo‘lishi kerak."),
  productNameRu: z.string().min(2, "Mahsulot nomi (RU) kamida 2 ta harfdan iborat bo‘lishi kerak."),
  productPrice: z
  .string()
  .refine((val) => !isNaN(Number(val)), {
    message: "Narx faqat raqam bo‘lishi kerak.",
  }),
  productCount: z.string().regex(/^\d+$/, "Soni faqat raqamlardan iborat bo‘lishi kerak."),
  productDescUz: z.string().min(5, "Tavsif (UZ) juda qisqa."),
  productDescRu: z.string().optional(),
  productTerm: z.string().regex(/^\d+$/, "Kafolat muddati raqam bo‘lishi kerak."),
  productDiscounted: z.string().regex(/^\d*$/, "Chegirma noto‘g‘ri formatda."),
  productCategory: z.string().min(1, "Kategoriya tanlanishi shart."),
  productSubCategory: z.string().min(1, "Subkategoriya tanlanishi shart."),
  productShopId: z.string().min(1, "Do‘kon tanlanishi shart."),
  productTags: z.array(z.string()).optional(),
  images: z.array(z.string().url("Rasm URL noto‘g‘ri.")).min(1, "Hech bo‘lmaganda bitta rasm yuklash kerak."),
});