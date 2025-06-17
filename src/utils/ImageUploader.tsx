"use client";

import { useRef, useState } from "react";
import { uploadImages } from "./uploadImages";
import { Trash2, Eye, UploadCloud } from "lucide-react";
import Image from "next/image";

type Props = {
  onSuccess: (urls: string[]) => void;
  initialUrls?: string[];
};

export const ImageUploader = ({ onSuccess, initialUrls = [] }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>(initialUrls);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validImages: File[] = [];
    const previewUrls: string[] = [];

    for (const file of selectedFiles) {
      const isImage = file.type.startsWith("image/");
      const isLt1MB = file.size / 1024 / 1024 < 1;

      if (!isImage) {
        alert(`Faqat rasm fayllari: ${file.name}`);
        continue;
      }

      if (!isLt1MB) {
        alert(`Rasm hajmi 1MB dan kichik bo‘lishi kerak: ${file.name}`);
        continue;
      }

      validImages.push(file);
      previewUrls.push(URL.createObjectURL(file));
    }

    setFiles((prev) => [...prev, ...validImages]);
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const { data } = await uploadImages(files);
      const allUrls = [...initialUrls, ...data];
      setPreviews(allUrls);
      setFiles([]);
      onSuccess(allUrls);
      alert("Rasmlar yuklandi!");
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      alert("Rasmlarni yuklashda xatolik yuz berdi.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onSuccess(updated);
  };

  const viewImage = (src: string) => {
    window.open(src, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Custom file uploader button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold rounded-lg text-sm"
        >
          <UploadCloud size={16} />
          Rasm yuklash
        </button>
      </div>

      {/* Image previews */}
      <div className="flex flex-wrap gap-4">
        {previews.map((src, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 rounded-xl overflow-hidden border shadow-sm group"
          >
            <Image
              src={src}
              alt={`preview-${idx}`}
              fill
              className="object-cover"
            />
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => viewImage(src)}
                className="bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <Eye size={14} />
              </button>
              <button
                onClick={() => removeImage(idx)}
                className="bg-red-100 p-1 rounded-full shadow hover:bg-red-200"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Button – only show if NEW files are selected */}
      {files.length > 0 && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50"
        >
          {uploading ? "Yuklanmoqda..." : "Yuborish"}
        </button>
      )}
    </div>
  );
};
