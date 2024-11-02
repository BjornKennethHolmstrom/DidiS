// src/components/ui/input.tsx
import { cn } from '@/lib/utils'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2',
            'text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-neutral-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2',
            error && 'border-error-main focus:ring-error-main',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-main">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
