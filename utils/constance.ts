export const APIBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Must match STATUSES in the backend models.ts
export const STATUSES = [
  "received",
  "diagnosing",
  "in repair",
  "ready for pickup",
  "delivered",
] as const;

export const STATUS_COLOR: Record<
  string,
  "info" | "warning" | "primary" | "secondary" | "success" | "default"
> = {
  received: "info",
  diagnosing: "warning",
  "in repair": "primary",
  "ready for pickup": "secondary",
  delivered: "success",
};

export const fmtDate = (v?: string) =>
  v
    ? new Date(v).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "";

export const inr = (n?: number) => (n || n === 0 ? `₹${Number(n).toLocaleString("en-IN")}` : "");
