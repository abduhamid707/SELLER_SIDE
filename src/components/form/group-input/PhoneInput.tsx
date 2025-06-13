import React from "react";

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Faqat raqamlar va 9 ta belgigacha
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 9);
    onChange(cleaned);
  };

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-700 dark:text-white/70">
        +998
      </span>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="90 123 45 67"
        className="w-full h-11 pl-16 pr-4 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default PhoneInput;
