import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) {
  const isDate = type === 'date';

  return (
    <input
      type={type}
      data-slot="input"
      data-type={type}
      className={cn(
        'flex h-10 sm:h-11 lg:h-12 w-full rounded-xl border border-[#e5e5e5] bg-[#fafaf8] px-4 py-2 text-sm sm:text-base transition-all outline-none placeholder:text-[#999] focus-visible:ring-2 focus-visible:ring-[#16610E] focus:border-[#16610E] focus:bg-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:px-5',
        isDate && 'cursor-pointer',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
