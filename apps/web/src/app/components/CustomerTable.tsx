import type { Customer } from "@atcs/shared";

function getStateBadgeClass(state: string): string {
  switch (state) {
    case "New":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    case "In Sudan":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "Cleared":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
    case "Left":
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    case "Violator":
    case "Extension Violator":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    case "Leaving Soon":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    case "Extended":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
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
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
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
    <div className="rounded-2xl border border-border bg-surface shadow-[var(--shadow-md)]">
      {/* Results header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
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
        <div className="flex flex-col items-center justify-center py-16 text-text-muted">
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-alt/50">
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Passport
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Car
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Carnet No.
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Book Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  State
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">
                  Days
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr
                  key={c._id}
                  className="transition-colors hover:bg-surface-alt/40"
                >
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {c.ownerFName?.[0]}
                        {c.ownerSName?.[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {c.ownerFName} {c.ownerSName} {c.ownerTName}
                        </p>
                        {c.residNum && (
                          <p className="text-xs text-text-muted">
                            Res: {c.residNum}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-text-secondary">
                    {c.passport}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <p className="text-foreground">
                      {c.carType} {c.carModel}
                    </p>
                    {c.plateNum && (
                      <p className="text-xs text-text-muted">{c.plateNum}</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-text-secondary">
                    {c.carnetNo}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-text-secondary">
                    {formatDate(c.bookDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStateBadgeClass(c.state)}`}
                    >
                      {c.state}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <div className="text-xs">
                      <span className="font-medium text-foreground">
                        {c.stayingTime ?? 0}
                      </span>
                      <span className="text-text-muted">
                        {" "}
                        / {c.availableTime ?? 90}d
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
