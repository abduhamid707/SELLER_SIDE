import BaseUrl from "@/services/axios";
import { useRef, useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await BaseUrl.post("/seller/shops/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          // progress ishlatmoqchi bo‘lsangiz, shu yerda qo‘shing
        },
      });

      const uploadedUrl = res.data?.data;
      console.log('uploadedUrl :', uploadedUrl);
      setPreview(uploadedUrl);
      onChange?.(uploadedUrl);
    } catch (err) {
      console.error("Rasm yuklashda xatolik:", err);
      alert("Rasm yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {preview ? (
        <div className="relative w-32 h-32">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-full border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-0.5"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 rounded-full border flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100"
        >
          {loading ? "Yuklanmoqda..." : "+ Rasm yuklash"}
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
