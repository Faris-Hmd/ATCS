"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import DateInput from "./DateInput";

const STATES = ["In Sudan", "Cleared", "Left"];

const DATE_FIELDS = [
  { value: "enteringDate", label: "Entering Date" },
  { value: "bookDate", label: "Carnet Date" },
];

function parseDate(str: string | null): Date | null {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function formatDateParam(date: Date | null): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const [state, setState] = useState(searchParams.get("state") ?? "");
  const [violator, setViolator] = useState(
    searchParams.get("violator") === "true",
  );
  const [extended, setExtended] = useState(
    searchParams.get("extended") === "true",
  );
  const [searchBy, setSearchBy] = useState(
    searchParams.get("searchBy") ?? "enteringDate",
  );
  const [startDate, setStartDate] = useState<Date | null>(
    parseDate(searchParams.get("startDate")),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    parseDate(searchParams.get("endDate")),
  );

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (state) params.set("state", state);
    if (violator) params.set("violator", "true");
    if (extended) params.set("extended", "true");

    const startStr = formatDateParam(startDate);
    const endStr = formatDateParam(endDate);
    if (startStr) params.set("startDate", startStr);
    if (endStr) params.set("endDate", endStr);
    if ((startStr || endStr) && searchBy) params.set("searchBy", searchBy);

    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/?${qs}` : "/");
    });
  }, [
    keyword,
    state,
    violator,
    extended,
    searchBy,
    startDate,
    endDate,
    router,
  ]);

  const handleReset = useCallback(() => {
    setKeyword("");
    setState("");
    setViolator(false);
    setExtended(false);
    setSearchBy("enteringDate");
    setStartDate(null);
    setEndDate(null);
    startTransition(() => {
      router.push("/");
    });
  }, [router]);

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-text-muted outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20";
  const selectClass = `${inputClass} appearance-none`;

  return (
    <div className="mb-6 rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow)]">
      {/* Row 1: Keyword + State + Toggles + Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="keyword"
            className="mb-1 block text-xs font-medium text-text-muted"
          >
            Search
          </label>
          <input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Name, passport, carnet..."
            className={inputClass}
          />
        </div>

        <div className="w-full sm:w-36">
          <label
            htmlFor="state"
            className="mb-1 block text-xs font-medium text-text-muted"
          >
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={selectClass}
          >
            <option value="">All States</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Violator & Extended toggles */}
        <div className="flex items-end gap-3">
          <label
            htmlFor="violator"
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
              violator
                ? "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
                : "border-border bg-background text-text-muted hover:border-border-focus"
            }`}
          >
            <input
              id="violator"
              type="checkbox"
              checked={violator}
              onChange={(e) => setViolator(e.target.checked)}
              className="sr-only"
            />
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                violator
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-border"
              }`}
            >
              {violator && (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            Violator
          </label>

          <label
            htmlFor="extended"
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
              extended
                ? "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                : "border-border bg-background text-text-muted hover:border-border-focus"
            }`}
          >
            <input
              id="extended"
              type="checkbox"
              checked={extended}
              onChange={(e) => setExtended(e.target.checked)}
              className="sr-only"
            />
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                extended
                  ? "border-purple-500 bg-purple-500 text-white"
                  : "border-border"
              }`}
            >
              {extended && (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            Extended
          </label>
        </div>

        <div className="flex gap-2">
          <button
            id="search-btn"
            onClick={handleSearch}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-hover active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <svg
                className="h-3.5 w-3.5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
            Search
          </button>
          <button
            id="reset-btn"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-all hover:bg-surface-alt active:scale-[0.97]"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Row 2: Date filters */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:w-44">
          <label
            htmlFor="searchBy"
            className="mb-1 block text-xs font-medium text-text-muted"
          >
            Date Field
          </label>
          <select
            id="searchBy"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className={selectClass}
          >
            {DATE_FIELDS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <DateInput
          id="startDate"
          label="From"
          selected={startDate}
          onChange={setStartDate}
          maxDate={endDate ?? undefined}
          placeholder="Start date..."
        />

        <DateInput
          id="endDate"
          label="To"
          selected={endDate}
          onChange={setEndDate}
          minDate={startDate ?? undefined}
          placeholder="End date..."
        />
      </div>
    </div>
  );
}
