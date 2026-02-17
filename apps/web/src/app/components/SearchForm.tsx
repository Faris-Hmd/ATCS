"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

const STATES = [
  "New",
  "In Sudan",
  "Cleared",
  "Left",
  "Violator",
  "Leaving Soon",
  "Extension Violator",
  "Extended",
];

const DATE_FIELDS = [
  { value: "enteringDate", label: "Entering Date" },
  { value: "bookDate", label: "Book Date" },
  { value: "passportIssueDate", label: "Passport Issue Date" },
  { value: "ownerResEndDate", label: "Residency End Date" },
];

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initialize from URL params
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const [state, setState] = useState(searchParams.get("state") ?? "");
  const [searchBy, setSearchBy] = useState(
    searchParams.get("searchBy") ?? "enteringDate",
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") ?? "",
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") ?? "");

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (state) params.set("state", state);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if ((startDate || endDate) && searchBy) params.set("searchBy", searchBy);

    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/?${qs}` : "/");
    });
  }, [keyword, state, searchBy, startDate, endDate, router]);

  const handleReset = useCallback(() => {
    setKeyword("");
    setState("");
    setSearchBy("enteringDate");
    setStartDate("");
    setEndDate("");
    startTransition(() => {
      router.push("/");
    });
  }, [router]);

  return (
    <div className="mb-8 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-md)]">
      <div className="mb-5 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 className="text-lg font-semibold text-foreground">
          Search Customers
        </h2>
      </div>

      {/* Keyword search */}
      <div className="mb-4">
        <label
          htmlFor="keyword"
          className="mb-1.5 block text-sm font-medium text-text-secondary"
        >
          Keyword Search
        </label>
        <input
          id="keyword"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by name, passport, carnet number..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-muted outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Filters row */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="state"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20 appearance-none"
          >
            <option value="">All States</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="searchBy"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Date Field
          </label>
          <select
            id="searchBy"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20 appearance-none"
          >
            {DATE_FIELDS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            From Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            To Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-border-focus focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          id="search-btn"
          onClick={handleSearch}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow)] transition-all hover:bg-primary-hover hover:shadow-[var(--shadow-md)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <svg
              className="h-4 w-4 animate-spin"
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
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
          {isPending ? "Searching..." : "Search"}
        </button>
        <button
          id="reset-btn"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-surface-alt hover:border-border-focus active:scale-[0.98]"
        >
          <svg
            className="h-4 w-4"
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
  );
}
