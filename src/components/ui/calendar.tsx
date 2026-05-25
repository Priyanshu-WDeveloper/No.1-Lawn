import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Caption({ displayMonth }: { displayMonth: Date }) {
  const { goToMonth, previousMonth, nextMonth } = useNavigation();
  const { fromYear = 2020, toYear = 2035, locale } = useDayPicker();

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(displayMonth.getFullYear(), i, 1);
    return { value: i, label: format(date, "MMMM", { locale }) };
  });

  const years = Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i);

  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      <button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="h-7 w-7 flex items-center justify-center rounded-xl border border-border bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <Select
        value={String(displayMonth.getMonth())}
        onValueChange={(v) => {
          const d = new Date(displayMonth);
          d.setMonth(parseInt(v));
          goToMonth(d);
        }}
      >
        <SelectTrigger size="sm" className="h-8 w-auto px-2 text-sm font-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m.value} value={String(m.value)}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(displayMonth.getFullYear())}
        onValueChange={(v) => {
          const d = new Date(displayMonth);
          d.setFullYear(parseInt(v));
          goToMonth(d);
        }}
      >
        <SelectTrigger size="sm" className="h-8 w-auto px-2 text-sm font-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="h-7 w-7 flex items-center justify-center rounded-xl border border-border bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear = 2020,
  toYear = 2035,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fromYear={fromYear}
      toYear={toYear}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "hidden",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary/5 [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
        day_today: "bg-primary/10 text-primary font-semibold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-primary/5 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-primary/10 aria-selected:text-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption,
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
