import { getCategories, getSubCategoriesByParentId } from "@/services/category/categoryService";
import { useEffect, useState } from "react";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getCategories();
                const parentCats = data.filter((item: any) => item.parent_id === null);
                setCategories(parentCats);
            } catch (error) {
                setCategories([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { categories, isLoading };
};

export const useSubCategories = (parentId: number | null) => {
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!parentId) return;
        setLoading(true);
        (async () => {
            try {
                const data = await getSubCategoriesByParentId(parentId);
                setSubCategories(data);
            } catch (err) {
                setSubCategories([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [parentId]);

    return { subCategories, isLoading };
};
