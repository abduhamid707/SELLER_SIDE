import React from "react";

export default function SkeletonCard() {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 animate-pulse bg-white dark:bg-white/[0.03]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>

      <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2" />
      <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-600 rounded" />
    </div>
  );
}
