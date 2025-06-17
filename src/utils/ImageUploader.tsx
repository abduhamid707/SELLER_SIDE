import { useState } from "react";
import { uploadImages } from "./uploadImages";

type Props = {
  onSuccess: (urls: string[]) => void;
};

export const ImageUploader = ({ onSuccess }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validImages: File[] = [];
    const previewUrls: string[] = [];

    for (const file of selectedFiles) {
      const isImage = file.type.startsWith("image/");
      const isLt1MB = file.size / 1024 / 1024 < 1;

      if (!isImage) {
        alert(`Faqat rasm fayllari yuklash mumkin: ${file.name}`);
        continue;
      }

      if (!isLt1MB) {
        alert(`Rasm hajmi 1MB dan oshmasligi kerak: ${file.name}`);
        continue;
      }

      validImages.push(file);
      previewUrls.push(URL.createObjectURL(file));
    }

    setFiles(validImages);
    setPreviews(previewUrls);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const { data } = await uploadImages(files);
      onSuccess(data);
      alert("Rasmlar muvaffaqiyatli yuklandi!");
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      alert("Rasmlarni yuklashda xatolik yuz berdi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-3"
      />

      <div className="flex flex-wrap gap-3 mb-4">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-24 h-24 object-cover rounded-lg border"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50"
      >
        {uploading ? "Yuklanmoqda..." : "Yuklash"}
      </button>
    </div>
  );
};
