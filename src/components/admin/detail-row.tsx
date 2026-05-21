// import React from 'react';

// interface DetailRowProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
//   valueClassName?: string;
//   isLast?: boolean;
// }

// export function DetailRow({
//   icon,
//   label,
//   value,
//   valueClassName,
//   isLast = false,
// }: DetailRowProps) {
//   const displayValue = value || 'Not provided';
//   const isEmpty = !value;

//   return (
//     <div
//       className={`flex items-center gap-3 py-2 ${isLast ? '' : 'border-b border-[#e5e5e5]'}`}
//     >
//       <div className="flex h-8 w-8 shrink-0 items-center justify-center">
//         <span className="text-[#777]">{icon}</span>
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-sm text-[#777]">{label}</p>
//       </div>
//       <div className="text-right">
//         <p
//           className={`text-sm font-medium ${valueClassName ?? (isEmpty ? 'text-[#777] italic' : 'text-[#151515]')}`}
//         >
//           {displayValue}
//         </p>
//       </div>
//     </div>
//   );
// }

import React from 'react';

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueClassName?: string;
  isLast?: boolean;
}

export function DetailRow({
  icon,
  label,
  value,
  valueClassName,
  isLast = false,
}: DetailRowProps) {
  const displayValue = value || 'Not provided';
  const isEmpty = !value;

  return (
    <div
      className={`flex items-center gap-2.5 py-[7px] ${
        isLast ? '' : 'border-b border-[#e5e5e5]'
      }`}
    >
      {/* Icon pill */}
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#EAF3DE] text-[#3B6D11]">
        {icon}
      </div>

      {/* Label */}
      <span className="flex-1 min-w-0 text-xs text-[#888]">
        {label}
      </span>

      {/* Value */}
      <span
        className={`max-w-[220px] truncate text-right text-[13px] font-medium ${
          valueClassName ??
          (isEmpty
            ? 'italic font-normal text-[#aaa]'
            : 'text-[#151515]')
        }`}
      >
        {displayValue}
      </span>
    </div>
  );
}
