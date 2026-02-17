import { Suspense } from "react";
import SearchForm from "./components/SearchForm";
import CustomerTable from "./components/CustomerTable";
import type { Customer } from "@atcs/shared";

const API_BASE = process.env.API_URL || "http://localhost:5000";

// Extend with MongoDB _id field since shared type doesn't include it
type CustomerWithId = Customer & { _id: string };

interface FetchResult {
  customers: CustomerWithId[];
  count: number;
  error?: string;
}

async function fetchCustomers(
  searchParams: Record<string, string | undefined>,
): Promise<FetchResult> {
  const { keyword, state, startDate, endDate, searchBy } = searchParams;

  const params = new URLSearchParams();
  if (keyword) params.set("keyword", keyword);
  if (state) params.set("state", state);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  if (searchBy) params.set("searchBy", searchBy);

  try {
    const res = await fetch(`${API_BASE}/api/customers?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { customers: [], count: 0, error: `Server error: ${res.status}` };
    }

    const data = await res.json();

    if (data.success) {
      return { customers: data.data, count: data.count };
    }

    return {
      customers: [],
      count: 0,
      error: data.error || "Failed to fetch customers",
    };
  } catch {
    return {
      customers: [],
      count: 0,
      error: "Could not connect to the backend. Is the server running?",
    };
  }
}

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const hasSearch = !!(
    params.keyword ||
    params.state ||
    params.startDate ||
    params.endDate
  );

  let result: FetchResult = { customers: [], count: 0 };

  if (hasSearch) {
    result = await fetchCustomers(params);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
              A
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">ATCS</h1>
              <p className="text-xs text-text-muted">Customer Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Suspense
          fallback={
            <div className="h-64 rounded-2xl border border-border bg-surface animate-pulse" />
          }
        >
          <SearchForm />
        </Suspense>

        <CustomerTable
          customers={result.customers}
          count={result.count}
          searched={hasSearch}
          error={result.error}
        />
      </main>
    </div>
  );
}
