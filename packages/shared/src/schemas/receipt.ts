import { z } from "zod";

// --- Enums ---

export const currencyEnum = z.enum(["SDG", "SAR", "USD"]);
export const paymentMethodEnum = z.enum(["Cash", "Bank Transfer", "Cheque"]);

// --- Main Receipt Schema ---

export const receiptSchema = z.object({
  customer: z.string().min(1, "Customer ID is required"), // ObjectId as string
  amount: z.number().min(0, "Amount must be positive"),
  currency: currencyEnum.default("SDG"),
  paymentMethod: paymentMethodEnum.default("Cash"),
  description: z.string().optional(),
  issuedBy: z.string().min(1, "Issued by (User ID) is required"), // ObjectId as string
  receiptDate: z.coerce.date().default(() => new Date()),
  receiptNumber: z.string().optional(),
});

// --- Derived Types ---

export type Receipt = z.infer<typeof receiptSchema>;
export type CreateReceiptInput = z.input<typeof receiptSchema>;
export type Currency = z.infer<typeof currencyEnum>;
export type PaymentMethod = z.infer<typeof paymentMethodEnum>;
