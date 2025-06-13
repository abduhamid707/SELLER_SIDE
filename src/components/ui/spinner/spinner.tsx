// components/ui/spinner.tsx
import React from "react";

type SpinnerProps = {
  text?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ text = "Yuklanmoqda..." }) => {
  return (
    <div className="flex items-center justify-center flex-col py-10">
      <div className="w-8 h-8 border-4 border-[#fd521c] border-t-transparent rounded-full animate-spin" />
      <p className="mt-3 text-sm text-gray-500">{text}</p>
    </div>
  );
};
