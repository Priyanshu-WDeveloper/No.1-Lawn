// import * as React from 'react';
// import { cn } from '@/lib/utils';
// // import { CheckIcon, ChevronRightIcon } from 'lucide-react';

// // interface DropdownMenuContextValue {
// //   open: boolean;
// //   setOpen: (open: boolean) => void;
// // }

// interface DropdownMenuContextValue {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   triggerRef: React.RefObject<HTMLElement | null>;
// }

// const DropdownMenuContext =
//   React.createContext<DropdownMenuContextValue | null>(null);

// function useDropdownMenuContext() {
//   const context = React.useContext(DropdownMenuContext);
//   if (!context) {
//     throw new Error(
//       'DropdownMenu components must be used within a DropdownMenu',
//     );
//   }
//   return context;
// }

// interface DropdownMenuProps {
//   children?: React.ReactNode;
// }

// // function DropdownMenu({ children }: DropdownMenuProps) {
// //   const [open, setOpen] = React.useState(false);

// //   return (
// //     <DropdownMenuContext.Provider value={{ open, setOpen }}>
// //       <div className="relative">{children}</div>
// //     </DropdownMenuContext.Provider>
// //   );
// // }

// function DropdownMenu({ children }: DropdownMenuProps) {
//   const [open, setOpen] = React.useState(false);

//   const triggerRef = React.useRef<HTMLElement>(null);

//   return (
//     <DropdownMenuContext.Provider
//       value={{
//         open,
//         setOpen,
//         triggerRef,
//       }}
//     >
//       <div className="relative">{children}</div>
//     </DropdownMenuContext.Provider>
//   );
// }

// interface DropdownMenuTriggerProps extends React.ComponentProps<'button'> {
//   asChild?: boolean;
// }

// // function DropdownMenuTrigger({
// //   children,
// //   asChild = false,
// //   ...props
// // }: DropdownMenuTriggerProps) {
// //   const { open, setOpen } = useDropdownMenuContext();

// //   if (asChild && React.isValidElement(children)) {
// //     const child = children as React.ReactElement<
// //       React.HTMLAttributes<HTMLElement>
// //     >;
// //     return React.cloneElement(child, {
// //       onClick: (e: React.MouseEvent<HTMLElement>) => {
// //         child.props.onClick?.(e);
// //         setOpen(!open);
// //       },
// //     });
// //   }

// //   return (
// //     <button
// //       data-slot="dropdown-menu-trigger"
// //       type="button"
// //       onClick={() => setOpen(!open)}
// //       {...props}
// //     >
// //       {children}
// //     </button>
// //   );
// // }
// function DropdownMenuTrigger({
//   children,
//   asChild = false,
//   ...props
// }: DropdownMenuTriggerProps) {
//   const { open, setOpen, triggerRef } = useDropdownMenuContext();

//   if (asChild && React.isValidElement(children)) {
//     // const child = children as React.ReactElement<
//     //   React.HTMLAttributes<HTMLElement>
//     // >;
//     const child = children as React.ReactElement<any>;

//     return React.cloneElement(child, {
//       ref: triggerRef,
//       onClick: (e: React.MouseEvent<HTMLElement>) => {
//         child.props.onClick?.(e);
//         setOpen(!open);
//       },
//     });
//   }

//   return (
//     <button
//       ref={triggerRef as React.RefObject<HTMLButtonElement>}
//       data-slot="dropdown-menu-trigger"
//       type="button"
//       onClick={() => setOpen(!open)}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// // interface DropdownMenuContentProps extends React.ComponentProps<'div'> {
// //   align?: 'start' | 'center' | 'end';
// //   sideOffset?: number;
// // }
// // function DropdownMenuContent({
// //   className,
// //   align = 'start',
// //   sideOffset = 4,
// //   children,
// //   ...props
// // }: DropdownMenuContentProps) {
// //   // const { open, setOpen } = useDropdownMenuContext();
// //   const { open, setOpen, triggerRef } = useDropdownMenuContext();
// //   const contentRef = React.useRef<HTMLDivElement>(null);

// //   // React.useEffect(() => {
// //   //   function handleClickOutside(event: MouseEvent) {
// //   //     if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
// //   //       setOpen(false)
// //   //     }
// //   //   }
// //   //   if (open) {
// //   //     document.addEventListener("mousedown", handleClickOutside)
// //   //     return () => document.removeEventListener("mousedown", handleClickOutside)
// //   //   }
// //   // }, [open, setOpen])

// //   React.useEffect(() => {
// //     function handleClickOutside(event: MouseEvent) {
// //       if (
// //         contentRef.current &&
// //         !contentRef.current.contains(event.target as Node)
// //       ) {
// //         // const trigger = contentRef.current
// //         //   .previousElementSibling as HTMLElement | null;

// //         const trigger = triggerRef.current;
// //         if (trigger && trigger.contains(event.target as Node)) return;
// //         setOpen(false);
// //       }
// //     }
// //     if (open) {
// //       document.addEventListener('mousedown', handleClickOutside);
// //       return () =>
// //         document.removeEventListener('mousedown', handleClickOutside);
// //     }
// //   }, [open, setOpen]);

// //   // Reset position when closed
// //   React.useEffect(() => {
// //     // Reset position styles when closed
// //     if (!open && contentRef.current) {
// //       contentRef.current.style.top = '';
// //       contentRef.current.style.left = '';
// //       contentRef.current.style.visibility = 'hidden';
// //       contentRef.current.style.opacity = '0';
// //       return;
// //     }
// //   }, [open]);

// //   React.useEffect(() => {
// //     if (!open || !contentRef.current) return;

// //     const content = contentRef.current;
// //     content.style.visibility = 'visible';
// //     content.style.opacity = '1';

// //     const updatePosition = () => {
// //       // const trigger = content.previousElementSibling as HTMLElement;
// //       const trigger = triggerRef.current;
// //       if (
// //         trigger
// //         // &&     trigger.dataset.slot === 'dropdown-menu-trigger'
// //       ) {
// //         const triggerRect = trigger.getBoundingClientRect();
// //         const contentRect = content.getBoundingClientRect();

// //         if (contentRect.width === 0 || contentRect.height === 0)
// //           return;

// //         let left = triggerRect.left;
// //         if (align === 'end') {
// //           left = triggerRect.right - contentRect.width;
// //         } else if (align === 'center') {
// //           left =
// //             triggerRect.left +
// //             (triggerRect.width - contentRect.width) / 2;
// //         }

// //         // Prevent overflow on left edge
// //         if (left < 8) left = 8;
// //         // Prevent overflow on right edge
// //         const maxLeft = window.innerWidth - contentRect.width - 8;
// //         if (left > maxLeft) left = maxLeft;

// //         content.style.top = `${triggerRect.bottom + sideOffset}px`;
// //         content.style.left = `${left}px`;
// //       }
// //     };

// //     // Initial position with slight delay to ensure content is rendered
// //     const timeoutId = setTimeout(updatePosition, 10);

// //     // Update position when content dimensions change
// //     const resizeObserver = new ResizeObserver(updatePosition);
// //     resizeObserver.observe(content);

// //     return () => {
// //       clearTimeout(timeoutId);
// //       resizeObserver.disconnect();
// //     };
// //   }, [open, align, sideOffset, triggerRef]);
// //   return (
// //     <div
// //       ref={contentRef}
// //       data-slot="dropdown-menu-content"
// //       className={cn(
// //         'fixed z-50 min-w-32 max-w-[280px] overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md',
// //         className,
// //       )}
// //       style={{ visibility: 'hidden', opacity: 0 }}
// //       {...props}
// //     >
// //       {children}
// //     </div>
// //   );
// // }

// interface DropdownMenuContentProps extends React.ComponentProps<'div'> {
//   align?: 'start' | 'center' | 'end';
//   sideOffset?: number;
// }

// function DropdownMenuContent({
//   className,
//   align = 'start',
//   sideOffset = 4,
//   children,
//   ...props
// }: DropdownMenuContentProps) {
//   const { open, setOpen, triggerRef } = useDropdownMenuContext();

//   const contentRef = React.useRef<HTMLDivElement>(null);

//   /**
//    * Close on outside click
//    */
//   React.useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         contentRef.current &&
//         !contentRef.current.contains(event.target as Node)
//       ) {
//         const trigger = triggerRef.current;

//         if (trigger && trigger.contains(event.target as Node)) {
//           return;
//         }

//         setOpen(false);
//       }
//     }

//     if (open) {
//       document.addEventListener('mousedown', handleClickOutside);

//       return () =>
//         document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [open, setOpen, triggerRef]);

//   /**
//    * Close on Escape key
//    */
//   React.useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === 'Escape') {
//         setOpen(false);
//       }
//     }

//     if (open) {
//       document.addEventListener('keydown', handleEscape);

//       return () =>
//         document.removeEventListener('keydown', handleEscape);
//     }
//   }, [open, setOpen]);

//   /**
//    * Position dropdown
//    */
//   React.useEffect(() => {
//     if (!open || !contentRef.current) return;

//     const content = contentRef.current;

//     const updatePosition = () => {
//       const trigger = triggerRef.current;

//       if (!trigger) return;

//       const triggerRect = trigger.getBoundingClientRect();

//       const contentRect = content.getBoundingClientRect();

//       if (contentRect.width === 0 || contentRect.height === 0) {
//         return;
//       }

//       let left = triggerRect.left;

//       /**
//        * Horizontal alignment
//        */
//       if (align === 'end') {
//         left = triggerRect.right - contentRect.width;
//       } else if (align === 'center') {
//         left =
//           triggerRect.left +
//           (triggerRect.width - contentRect.width) / 2;
//       }

//       /**
//        * Prevent left overflow
//        */
//       if (left < 8) {
//         left = 8;
//       }

//       /**
//        * Prevent right overflow
//        */
//       const maxLeft = window.innerWidth - contentRect.width - 8;

//       if (left > maxLeft) {
//         left = maxLeft;
//       }

//       /**
//        * Vertical position
//        */
//       const top = triggerRect.bottom + sideOffset;

//       content.style.top = `${top}px`;
//       content.style.left = `${left}px`;
//     };

//     /**
//      * Initial positioning
//      */
//     const timeoutId = setTimeout(updatePosition, 10);

//     /**
//      * Observe content resize
//      */
//     const resizeObserver = new ResizeObserver(updatePosition);

//     resizeObserver.observe(content);

//     /**
//      * Reposition on scroll/resize
//      */
//     window.addEventListener('resize', updatePosition);

//     window.addEventListener('scroll', updatePosition, true);

//     return () => {
//       clearTimeout(timeoutId);

//       resizeObserver.disconnect();

//       window.removeEventListener('resize', updatePosition);

//       window.removeEventListener('scroll', updatePosition, true);
//     };
//   }, [open, align, sideOffset, triggerRef]);

//   return (
//     <div
//       ref={contentRef}
//       data-slot="dropdown-menu-content"
//       className={cn(
//         `
//         fixed
//         z-50
//         min-w-32
//         max-w-[280px]
//         overflow-hidden
//         rounded-xl
//         border
//         border-border
//         bg-popover
//         p-1
//         text-popover-foreground
//         shadow-lg
//         transition-opacity
//         duration-100
//         `,
//         className,
//       )}
//       style={{
//         visibility: open ? 'visible' : 'hidden',
//         opacity: open ? 1 : 0,
//       }}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// function DropdownMenuGroup({
//   className,
//   ...props
// }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot="dropdown-menu-group"
//       className={cn('', className)}
//       {...props}
//     />
//   );
// }

// interface DropdownMenuItemProps extends React.ComponentProps<'div'> {
//   inset?: boolean;
//   variant?: 'default' | 'destructive';
// }

// function DropdownMenuItem({
//   className,
//   inset,
//   variant = 'default',
//   onClick,
//   ...props
// }: DropdownMenuItemProps) {
//   const { setOpen } = useDropdownMenuContext();

//   return (
//     <div
//       data-slot="dropdown-menu-item"
//       data-inset={inset}
//       data-variant={variant}
//       className={cn(
//         'relative flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm outline-none select-none data-[variant=destructive]:text-destructive data-disabled:pointer-events-none data-disabled:opacity-50',
//         className,
//       )}
//       onClick={(e) => {
//         onClick?.(e);
//         setOpen(false);
//       }}
//       {...props}
//     />
//   );
// }

// function DropdownMenuCheckboxItem({
//   className,
//   children,
//   checked,
//   inset,
//   ...props
// }: React.ComponentProps<'div'> & {
//   inset?: boolean;
//   checked?: boolean;
// }) {
//   const { setOpen } = useDropdownMenuContext();

//   return (
//     <div
//       data-slot="dropdown-menu-checkbox-item"
//       data-inset={inset}
//       className={cn(
//         'relative flex cursor-pointer items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-sm outline-none select-none',
//         className,
//       )}
//       onClick={() => setOpen(false)}
//       {...props}
//     >
//       {checked && (
//         <span className="pointer-events-none absolute right-2 flex items-center justify-center">
//           <CheckIcon className="size-4" />
//         </span>
//       )}
//       {children}
//     </div>
//   );
// }

// function DropdownMenuRadioGroup({
//   className,
//   ...props
// }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot="dropdown-menu-radio-group"
//       className={cn('', className)}
//       {...props}
//     />
//   );
// }

// function DropdownMenuRadioItem({
//   className,
//   children,
//   inset,
//   ...props
// }: React.ComponentProps<'div'> & { inset?: boolean }) {
//   const { setOpen } = useDropdownMenuContext();

//   return (
//     <div
//       data-slot="dropdown-menu-radio-item"
//       data-inset={inset}
//       className={cn(
//         'relative flex cursor-pointer items-center gap-1.5 rounded-md py-1 pr-8 pl-2 text-sm outline-none select-none',
//         className,
//       )}
//       onClick={() => setOpen(false)}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// interface DropdownMenuLabelProps extends React.ComponentProps<'div'> {
//   inset?: boolean;
// }

// function DropdownMenuLabel({
//   className,
//   inset,
//   ...props
// }: DropdownMenuLabelProps) {
//   return (
//     <div
//       data-slot="dropdown-menu-label"
//       data-inset={inset}
//       className={cn('px-2 py-1 text-xs font-medium', className)}
//       {...props}
//     />
//   );
// }

// function DropdownMenuSeparator({
//   className,
//   ...props
// }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot="dropdown-menu-separator"
//       className={cn('-mx-1 my-1 h-px bg-border', className)}
//       {...props}
//     />
//   );
// }

// function DropdownMenuShortcut({
//   className,
//   ...props
// }: React.ComponentProps<'span'>) {
//   return (
//     <span
//       data-slot="dropdown-menu-shortcut"
//       className={cn(
//         'ml-auto text-xs tracking-widest text-muted-foreground',
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function DropdownMenuSub({
//   children,
// }: {
//   children?: React.ReactNode;
// }) {
//   return (
//     <div data-slot="dropdown-menu-sub" className="relative">
//       {children}
//     </div>
//   );
// }

// function DropdownMenuSubTrigger({
//   className,
//   inset,
//   children,
//   ...props
// }: React.ComponentProps<'div'> & { inset?: boolean }) {
//   return (
//     <div
//       data-slot="dropdown-menu-sub-trigger"
//       data-inset={inset}
//       className={cn(
//         'flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm outline-none select-none [&_svg]:size-4',
//         className,
//       )}
//       {...props}
//     >
//       {children}
//       <ChevronRightIcon className="ml-auto size-4" />
//     </div>
//   );
// }

// function DropdownMenuSubContent({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot="dropdown-menu-sub-content"
//       className={cn(
//         'absolute left-full top-0 z-50 min-w-[96px] overflow-hidden rounded-lg bg-popover p-1 shadow-lg ml-1',
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// export {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuCheckboxItem,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubTrigger,
//   DropdownMenuSubContent,
// };

// dropdown-menu.tsx

import * as React from 'react';
import { cn } from '@/lib/utils';
// import { CheckIcon, ChevronRightIcon } from 'lucide-react';

/* =========================================================
   CONTEXT
========================================================= */

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      'DropdownMenu components must be used within a DropdownMenu',
    );
  }

  return context;
}

/* =========================================================
   ROOT
========================================================= */

interface DropdownMenuProps {
  children?: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);

  const triggerRef = React.useRef<HTMLElement>(null);

  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

/* =========================================================
   TRIGGER
========================================================= */

interface DropdownMenuTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

function DropdownMenuTrigger({
  children,
  asChild = false,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    props.onClick?.(e as React.MouseEvent<HTMLButtonElement>);

    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;

    return React.cloneElement(child, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);

        handleClick(e);
      },
    });
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      data-slot="dropdown-menu-trigger"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

/* =========================================================
   CONTENT
========================================================= */

interface DropdownMenuContentProps extends React.ComponentProps<'div'> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

function DropdownMenuContent({
  className,
  align = 'start',
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();

  const contentRef = React.useRef<HTMLDivElement>(null);

  /* ================================
     OUTSIDE CLICK
  ================================= */

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        const trigger = triggerRef.current;

        if (trigger && trigger.contains(event.target as Node)) {
          return;
        }

        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open, setOpen, triggerRef]);

  /* ================================
     ESC CLOSE
  ================================= */

  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [open, setOpen]);

  /* ================================
     POSITIONING
  ================================= */

  React.useEffect(() => {
    if (!open || !contentRef.current) return;

    const content = contentRef.current;

    const updatePosition = () => {
      const trigger = triggerRef.current;

      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();

      const contentRect = content.getBoundingClientRect();

      if (contentRect.width === 0 || contentRect.height === 0) {
        return;
      }

      let left = triggerRect.left;

      if (align === 'end') {
        left = triggerRect.right - contentRect.width;
      }

      if (align === 'center') {
        left =
          triggerRect.left +
          (triggerRect.width - contentRect.width) / 2;
      }

      if (left < 8) {
        left = 8;
      }

      const maxLeft = window.innerWidth - contentRect.width - 8;

      if (left > maxLeft) {
        left = maxLeft;
      }

      const spaceBelow = window.innerHeight - triggerRect.bottom;

      const shouldFlip = spaceBelow < contentRect.height + sideOffset;

      let top = triggerRect.bottom + sideOffset;

      if (shouldFlip) {
        top = triggerRect.top - contentRect.height - sideOffset;
      }

      content.style.top = `${top}px`;
      content.style.left = `${left}px`;
    };

    const frame = requestAnimationFrame(updatePosition);

    const resizeObserver = new ResizeObserver(updatePosition);

    resizeObserver.observe(content);

    window.addEventListener('resize', updatePosition);

    window.addEventListener('scroll', updatePosition, true);

    return () => {
      cancelAnimationFrame(frame);

      resizeObserver.disconnect();

      window.removeEventListener('resize', updatePosition);

      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, align, sideOffset, triggerRef]);

  return (
    <div
      ref={contentRef}
      data-slot="dropdown-menu-content"
      className={cn(
        `
        fixed
        z-50
        min-w-40
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-popover
        p-1
        text-popover-foreground
        shadow-xl
        transition-all
        duration-100
        `,
        className,
      )}
      style={{
        visibility: open ? 'visible' : 'hidden',
        opacity: open ? 1 : 0,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ITEM
========================================================= */

interface DropdownMenuItemProps extends React.ComponentProps<'button'> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  onClick,
  children,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenuContext();

  return (
    <button
      type="button"
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        `
        relative
        flex
        w-full
        cursor-pointer
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        transition-colors
        outline-none
        select-none

        hover:bg-muted

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring

        data-[variant=destructive]:text-red-500
        `,
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/* =========================================================
   SEPARATOR
========================================================= */

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

/* =========================================================
   LABEL
========================================================= */

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'px-3 py-2 text-xs font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

/* =========================================================
   SHORTCUT
========================================================= */

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'ml-auto text-xs text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
};
