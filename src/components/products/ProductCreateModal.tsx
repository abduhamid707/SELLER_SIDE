"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useAuthStore } from "@/stores/authStore";
import { useCreateProduct } from "@/hooks/product/useProduct";
import { ImageUploader } from "@/utils/ImageUploader";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { useCategories, useSubCategories } from "@/hooks/category/useCategories";
import { useProductTags } from "@/hooks/tag/useProductTags";
import { productSchema } from "@/schemas/sellerSchema";
import { useShopsBySellerId } from "@/hooks/useShopsBySellerId";
import SkuCreateModal from "./SkuClient/SkuCreateModal";

type ProductFormState = {
    productNameUz: string;
    productNameRu: string;
    productPrice: string;
    productCount: string;
    productDescUz: string;
    productDescRu: string;
    productTerm: string;
    productDiscounted: string;
    productSubCategory: string;
    productShopId: string;
    productTags: string[];
};

export default function ProductCreateModal({
    isOpen,
    onClose,
    initialData,
    onProductCreated,
}: {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Partial<ProductFormState> & { images?: string[] };
    onProductCreated?: (product: any) => void;
}) {
    const { seller } = useAuthStore();
    const sellerId = seller?.id;
    const { data: shop = [] } = useShopsBySellerId(sellerId.toString());

    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState<ProductFormState>({
        productNameUz: "",
        productNameRu: "",
        productPrice: "",
        productCount: "",
        productDescUz: "",
        productDescRu: "",
        productTerm: "",
        productDiscounted: "",
        productSubCategory: "",
        productShopId: "",
        productTags: [],
    });
    const [images, setImages] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const [showSkuModal, setShowSkuModal] = useState(false);
    const [createdProduct, setCreatedProduct] = useState<any>(null);

    const { categories } = useCategories();

    const { subCategories } = useSubCategories(formState.productCategory);
    const { tags: tagOptionsRaw } = useProductTags();

    useEffect(() => {
        if (initialData) {
            setFormState((prev) => ({
                ...prev,
                ...initialData,
            }));

            if (initialData.images) {
                setImages(initialData.images);
            }
        }
    }, [initialData]);


    // Format tag options
    const tagOptions = tagOptionsRaw.map((tag) => {
        const nameArray = Array.isArray(tag.name) ? tag.name : [];
        const uzName = nameArray.find((n) => n.startsWith("uz_UZ"));
        const label = uzName ? uzName.split(":")[1]?.trim() : tag.code;

        return {
            label: label || tag.code,
            value: tag.code,
        };
    });

    // Format category options
    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: Array.isArray(cat.name) ? cat.name[0]?.split(":")[1] : cat.name,
    }));

    const subCategoryOptions = subCategories.map((sub) => ({
        value: sub.id,
        label: Array.isArray(sub.name) ? sub.name[0]?.split(":")[1] : sub.name,
    }));
    const shopOptions = (shop ?? []).map((shop) => ({
        label: shop.name,
        value: shop.id.toString(), // string format — zod bilan mos
    }));


    const { mutate: createProductMutate, isLoading } = useCreateProduct();
    const validateField = (name: string, value: string) => {
        try {
            productSchema.pick({ [name]: true }).parse({ [name]: value });
            setFormErrors((prev) => ({ ...prev, [name]: "" })); // ✅ Xato yo‘q bo‘lsa tozalaymiz
        } catch (error: any) {
            if (error?.errors?.[0]?.message) {
                setFormErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
            }
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step !== 3) return;

        const fullFormData = {
            ...formState,
            productCategory: formState.productCategory,
            images,
        };

        const validation = productSchema.safeParse(fullFormData);
        if (!validation.success) {
            const errors: Record<string, string> = {};
            validation.error.errors.forEach((err) => {
                const field = err.path[0] as string;
                errors[field] = err.message;
            });
            setFormErrors(errors);
            return;
        }

        const payload = {
            name_uz: formState.productNameUz,
            name_ru: formState.productNameRu,
            price: Number(formState.productPrice),
            count: Number(formState.productCount),
            details_uz: formState.productDescUz,
            details_ru: formState.productDescRu,
            guaranty_time: Number(formState.productTerm),
            discounted_price: Number(formState.productDiscounted),
            category_id: Number(formState.productSubCategory),
            shop_id: Number(formState.productShopId),
            tags: formState.productTags,
            images,
            seller_id: seller.id,
        };

        createProductMutate(payload, {
            onSuccess: ({ data }) => {
                if (onProductCreated) onProductCreated(data);
                onClose();
                setStep(1);
                setFormState({
                    productNameUz: "",
                    productNameRu: "",
                    productPrice: "",
                    productCount: "",
                    productDescUz: "",
                    productDescRu: "",
                    productTerm: "",
                    productDiscounted: "",
                    productSubCategory: "",
                    productShopId: "",
                    productTags: [],
                });
                setImages([]);
                setFormErrors({});
            },
        });
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
                <form className="p-6" onSubmit={handleSubmit}>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Mahsulot qo‘shish</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Step {step} of 3</p>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        {step === 1 && (
                            <>
                                <InputBlock
                                    label="Mahsulot nomi (UZ)"
                                    name="productNameUz"
                                    value={formState.productNameUz}
                                    onChange={handleChange}
                                    error={formErrors.productNameUz}
                                />
                                <InputBlock
                                    label="Mahsulot nomi (RU)"
                                    name="productNameRu"
                                    value={formState.productNameRu}
                                    onChange={handleChange}
                                    error={formErrors.productNameRu}
                                />
                                <InputBlock
                                    label="Narxi"
                                    name="productPrice"
                                    value={formState.productPrice}
                                    onChange={handleChange}
                                    type="number"
                                    error={formErrors.productPrice}
                                />
                                <InputBlock
                                    label="Soni"
                                    name="productCount"
                                    value={formState.productCount}
                                    onChange={handleChange}
                                    type="number"
                                    error={formErrors.productCount}
                                />
                                <InputBlock
                                    label="Chegirma"
                                    name="productDiscounted"
                                    value={formState.productDiscounted}
                                    onChange={handleChange}
                                    type="number"
                                    error={formErrors.productDiscounted}
                                />
                                <InputBlock
                                    label="Kafolat muddati (oy)"
                                    name="productTerm"
                                    value={formState.productTerm}
                                    onChange={handleChange}
                                    type="number"
                                    error={formErrors.productTerm}
                                />
                            </>
                        )}


                        {step === 2 && (
                            <>
                                <div className="lg:col-span-2">
                                    <Label>Ta'rif (UZ)</Label>
                                    <TextArea
                                        value={formState.productDescUz}
                                        onChange={(value) => setFormState({ ...formState, productDescUz: value })}
                                        error={formErrors.productDescUz}
                                    />
                                </div>

                                <div className="lg:col-span-2">
                                    <Label>Ta'rif (RU)</Label>
                                    <TextArea
                                        value={formState.productDescRu}
                                        onChange={(value) => setFormState({ ...formState, productDescRu: value })}
                                        error={formErrors.productDescRu}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <Label>Do‘kon tanlang</Label>
                                    <Select
                                        options={shopOptions}
                                        value={formState.productShopId}
                                        onChange={(val) => {
                                            setFormState((prev) => ({ ...prev, productShopId: val }));
                                            validateField("productShopId", val);
                                        }}
                                        error={formErrors.productShopId}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <Label>Kategoriya</Label>
                                    <Select
                                        options={categoryOptions}
                                        value={formState.productCategory}
                                        onChange={(val) => {
                                            setFormState({ ...formState, productCategory: val, productSubCategory: "" });
                                        }}
                                        error={formErrors.productCategory}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <Label>Subkategoriya</Label>
                                    <Select
                                        options={subCategoryOptions}
                                        value={formState.productSubCategory}
                                        onChange={(val) => setFormState({ ...formState, productSubCategory: val })}
                                        disabled={subCategoryOptions.length === 0}
                                        error={formErrors.productSubCategory}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <Label>Teglar</Label>
                                    <Select
                                        options={tagOptions}
                                        value={tagOptions.filter(tag => formState.productTags.includes(tag.value))} // ✅ to‘g‘ri ko‘rsatish
                                        onChange={(val) => {
                                            const selected = Array.isArray(val) ? val.map((v) => v.value) : [];
                                            setFormState({ ...formState, productTags: selected });
                                            validateField("productTags", selected);
                                        }}
                                        isMulti={true}
                                        error={formErrors.productTags}
                                    />

                                </div>
                            </>
                        )}


                        {step === 3 && (
                            <div className="col-span-2">
                                <p className="text-sm font-medium mb-2 text-gray-700 dark:text-white">Rasmlar</p>
                                <ImageUploader
                                    onSuccess={(urls) => setImages(urls)}
                                    initialUrls={images} // yoki selectedB2BProduct?.images
                                />

                                {formErrors.images && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.images}</p>
                                )}
                            </div>
                        )}

                    </div>

                    <div className="flex justify-between gap-3 mt-6">
                        <Button variant="outline" type="button" onClick={onClose}>Bekor qilish</Button>
                        <div className="flex gap-3">
                            {step > 1 && <Button variant="custom" onClick={prevStep} type="button"

                            >Ortga</Button>}
                            {step < 3 && <Button variant="custom" onClick={nextStep} type="button"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#fd521c] hover:bg-[#e64816] rounded-lg"

                            >Keyingi</Button>}
                            {step === 3 && <Button type="submit" variant="custom" disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#fd521c] hover:bg-[#e64816] rounded-lg"

                            >
                                {isLoading ? "Yuborilmoqda..." : "Saqlash"}
                            </Button>}
                        </div>
                    </div>
                </form>
            </Modal>
            {/* <SkuCreateModal
                isOpen={showSkuModal}
                onClose={() => setShowSkuModal(false)}
                product={createdProduct}
                sellerId={sellerId}
            /> */}

        </>
    );
}

function InputBlock({
    label,
    name,
    value,
    onChange,
    type = "text",
    required = true,
    placeholder,
    error,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    placeholder?: string;
    error?: string;
}) {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full px-4 py-2 text-sm rounded-xl border transition-colors outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-orange-500"
                    } dark:bg-gray-800 dark:text-white dark:border-gray-700`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

