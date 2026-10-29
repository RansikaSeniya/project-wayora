import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "lime" | "pink";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[#1F1924] text-white border-transparent",
    secondary: "bg-[#FFF0F5] text-[#D83B72] border-[#FFD6E5]",
    outline: "bg-white/80 text-[#1F1924] border-[#E8DCE2] backdrop-blur-sm",
    lime: "bg-[#D9F27A] text-[#233000] border-transparent",
    pink: "bg-[#FF6F9C] text-white border-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

