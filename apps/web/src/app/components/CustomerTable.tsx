import type { Customer } from "@atcs/shared";

function getStateBadgeClass(state: string): string {
  switch (state) {
    case "In Sudan":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "Cleared":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
    case "Left":
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
}

function formatDate(dateVal?: string | Date): string {
  if (!dateVal) return "—";
  return new Date(dateVal).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Extend with MongoDB _id field
type CustomerWithId = Customer & { _id: string };

interface CustomerTableProps {
  customers: CustomerWithId[];
  count: number;
  searched: boolean;
  error?: string;
}

export default function CustomerTable({
  customers,
  count,
  searched,
  error,
}: CustomerTableProps) {
  if (error) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
        <svg
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        {error}
      </div>
    );
  }

  if (!searched) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-text-muted">
        <svg
          className="mb-4 h-16 w-16 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-base font-medium">Search for customers</p>
        <p className="mt-1 text-sm">
          Use the form above to query customer data
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-base font-semibold text-foreground">Results</h3>
        </div>
        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
          {count} customer{count !== 1 ? "s" : ""} found
        </span>
      </div>

      {customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface py-16 text-text-muted shadow-[var(--shadow)]">
          <svg
            className="mb-3 h-12 w-12 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-sm font-medium">No customers found</p>
          <p className="mt-1 text-xs">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((c) => (
            <div
              key={c._id}
              className="group rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)] transition-all hover:shadow-[var(--shadow-md)] hover:border-primary/30"
            >
              {/* Top: Name + State badge */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {c.ownerFName?.[0]}
                    {c.ownerSName?.[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {c.ownerFName} {c.ownerSName} {c.ownerTName}
                    </p>
                    <p className="font-mono text-xs text-text-muted">
                      {c.passport}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStateBadgeClass(c.state)}`}
                  >
                    {c.state}
                  </span>
                  {/* Violator / Extended flags */}
                  <div className="flex gap-1">
                    {c.violator && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                        <svg
                          className="h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01"
                          />
                        </svg>
                        Violator
                      </span>
                    )}
                    {c.extended && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                        <svg
                          className="h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3"
                          />
                        </svg>
                        Extended
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-3 border-t border-border" />

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <p className="text-xs text-text-muted">Chassis No.</p>
                  <p className="font-mono text-xs font-medium text-foreground">
                    {c.chaseNum}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Carnet No.</p>
                  <p className="font-mono text-xs font-medium text-foreground">
                    {c.carnetNo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Car</p>
                  <p className="text-sm text-foreground">
                    {c.carType} {c.carModel}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Carnet Date</p>
                  <p className="text-sm text-foreground">
                    {formatDate(c.bookDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Entering Date</p>
                  <p className="text-sm text-foreground">
                    {formatDate(c.enteringDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Left Date</p>
                  <p className="text-sm text-foreground">
                    {formatDate(c.leftDate)}
                  </p>
                </div>
              </div>

              {/* Bottom: Days bar */}
              <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-alt px-3 py-2">
                <span className="text-xs text-text-muted">Staying</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground">
                    {c.stayingTime ?? 0}
                  </span>
                  <span className="text-xs text-text-muted">
                    / {c.availableTime ?? 90} days
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
