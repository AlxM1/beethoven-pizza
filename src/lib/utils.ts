export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `BPZ-${date}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}

export function calculateTax(subtotal: number): number {
  // BC PST (7%) + GST (5%) = 12%
  return subtotal * 0.12;
}

export function calculateTotal(subtotal: number): number {
  return subtotal + calculateTax(subtotal);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeStyle: "short",
  }).format(date);
}

export const ORDER_STATUSES = {
  pending: { label: "Pending", color: "yellow" },
  confirmed: { label: "Confirmed", color: "blue" },
  preparing: { label: "Preparing", color: "orange" },
  ready: { label: "Ready", color: "green" },
  completed: { label: "Completed", color: "gray" },
  cancelled: { label: "Cancelled", color: "red" },
} as const;

export const PAYMENT_STATUSES = {
  pending: { label: "Pending", color: "yellow" },
  paid: { label: "Paid", color: "green" },
  failed: { label: "Failed", color: "red" },
  refunded: { label: "Refunded", color: "gray" },
} as const;

export const ORDER_TYPES = {
  phone: { label: "Phone Order", color: "purple" },
  online_stripe: { label: "Online (Paid)", color: "green" },
  online_pickup: { label: "Pay at Pickup", color: "blue" },
} as const;
