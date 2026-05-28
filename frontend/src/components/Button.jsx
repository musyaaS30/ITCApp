import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-sans text-[14px] leading-[1.29] tracking-carbon transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none rounded-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-hover active:bg-[#0353e9]",
    secondary: "bg-ink text-white hover:bg-[#4d4d4d]",
    tertiary: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:bg-surface-1",
    danger: "bg-semantic-error text-white hover:bg-[#ba1b23]",
  };

  const sizes = {
    default: "py-[12px] px-[16px]",
    sm: "py-[8px] px-[12px]",
    lg: "py-[16px] px-[24px]",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
