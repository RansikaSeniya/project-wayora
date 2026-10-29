import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "lime" | "pink" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-[#1F1924] text-white hover:bg-[#32293A] shadow-md shadow-black/10",
      lime: "bg-[#D9F27A] text-[#233000] hover:bg-[#c9e663] shadow-lg shadow-[#233000]/10",
      pink: "bg-[#FF6F9C] text-white hover:bg-[#f25787] shadow-lg shadow-[#FF6F9C]/25",
      outline:
        "border border-[#E5D8DF] bg-white text-[#1F1924] hover:bg-[#FFF5F8] hover:border-[#FF8FB1]",
      ghost: "bg-transparent text-[#1F1924] hover:bg-[#FFF0F5]",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-13 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

