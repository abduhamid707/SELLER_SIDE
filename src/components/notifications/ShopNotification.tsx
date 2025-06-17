"use client";
import React from "react";

interface Props {
  status: number;
}

export default function ShopNotification({ status }: Props) {
  if (![1, 2, 3].includes(status)) return null;

  const getMessage = () => {
    switch (status) {
      case 1:
        return "Sizning do‘koningiz tekshirilmoqda. Tasdiqlashingiz kutilyapti.";
      case 2:
        return "Do‘koningiz moderator tomonidan ko‘rib chiqilmoqda.";
      case 3:
        return "Do‘koningiz tasdiqlandi. Tahrirlash imkoniyati mavjud.";
    }
  };

  const getColor = () => {
    switch (status) {
      case 1:
        return "yellow";
      case 2:
        return "blue";
      case 3:
        return "green";
      default:
        return "gray";
    }
  };

  const color = getColor();
  const message = getMessage();

  return (
    <div className={`mb-4 rounded-xl border border-${color}-300 bg-${color}-50 p-4 text-sm text-${color}-800 dark:border-${color}-700 dark:bg-${color}-900/20 dark:text-${color}-300`}>
      {message}
    </div>
  );
}
