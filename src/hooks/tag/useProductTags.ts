import { useEffect, useState } from "react";
import { getAllProductTags } from "@/services/tagService";

export const useProductTags = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProductTags();
        setTags(data || []);
      } catch (error) {
        console.error("Teglarni olishda xatolik:", error);
        setTags([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { tags, isLoading };
};
