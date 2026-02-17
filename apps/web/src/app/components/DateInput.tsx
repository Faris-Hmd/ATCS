"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  id: string;
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
}

export default function DateInput({
  id,
  label,
  selected,
  onChange,
  placeholder = "Select date...",
  maxDate,
  minDate,
}: DateInputProps) {
  return (
    <div className="w-full sm:flex-1">
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium text-text-muted"
      >
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        maxDate={maxDate}
        minDate={minDate}
        isClearable
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-text-muted outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20"
        calendarClassName="atcs-calendar"
        wrapperClassName="w-full"
        autoComplete="off"
      />
    </div>
  );
}
