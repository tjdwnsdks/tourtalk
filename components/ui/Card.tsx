"use client";

export function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
