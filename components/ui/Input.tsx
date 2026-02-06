"use client";

import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; wrapperClassName?: string }
>(function Input({ className = "", label, error, wrapperClassName, ...props }, ref) {
  return (
    <div className={`w-full ${wrapperClassName ?? ""}`.trim()}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={[
          "w-full rounded-xl border border-gray-300 px-4 py-3 text-base",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
          "disabled:bg-gray-100 disabled:opacity-70",
          "min-h-[44px]",
          error ? "border-red-500" : "",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});
