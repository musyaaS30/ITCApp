import React, { useState } from 'react';
import { cn } from './Button';
import { Eye, EyeOff } from 'lucide-react';

export const TextInput = React.forwardRef(({ className, label, error, helperText, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            "bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] w-full",
            "border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary",
            "disabled:bg-surface-2 disabled:text-ink-subtle disabled:border-transparent cursor-text",
            isPassword && "pr-[44px]",
            error && "border-b-2 border-b-semantic-error focus:border-b-semantic-error",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
          >
            {showPassword ? (
              <EyeOff className="w-[18px] h-[18px]" />
            ) : (
              <Eye className="w-[18px] h-[18px]" />
            )}
          </button>
        )}
      </div>
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

