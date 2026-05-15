import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-[#e5e5e5] bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-[#999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16610E] focus:border-[#16610E] focus:bg-white transition-all disabled:cursor-not-allowed disabled:opacity-50 md:px-5 md:py-4",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }