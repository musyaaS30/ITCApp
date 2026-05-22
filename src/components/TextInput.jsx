import React from 'react';
import { cn } from './Button';

export const TextInput = React.forwardRef(({ className, label, error, helperText, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] w-full",
          "border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary",
          "disabled:bg-surface-2 disabled:text-ink-subtle disabled:border-transparent cursor-text",
          error && "border-b-2 border-b-semantic-error focus:border-b-semantic-error",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-[12px] text-semantic-error mt-1 tracking-carbon">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="text-[12px] text-ink-subtle mt-1 tracking-carbon">
          {helperText}
        </span>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";
