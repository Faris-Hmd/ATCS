import { z } from "zod";

// --- Sub-schemas ---

export const addressKsaSchema = z.object({
  guarantor: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  building: z.string().optional(),
  fullAddress: z.string().optional(),
  whatsapp: z.string().optional(),
});

export const addressSudanSchema = z.object({
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  square: z.string().optional(),
  houseNum: z.string().optional(),
  fullAddress: z.string().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  whatsapp: z.string().optional(),
});

export const relativeSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  workAddress: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  square: z.string().optional(),
  houseNum: z.string().optional(),
  houseAddress: z.string().optional(),
});

// --- Enums ---

export const customerStateEnum = z.enum([
  "New",
  "In Sudan",
  "Cleared",
  "Left",
  "Violator",
  "Leaving Soon",
  "Extension Violator",
  "Extended",
]);

export const bookTypeEnum = z.enum(["عادي", "سياحي"]);

// --- Main Customer Schema ---

export const customerSchema = z.object({
  // Owner Details
  ownerFName: z.string().min(1, "First name is required"),
  ownerSName: z.string().min(1, "Second name is required"),
  ownerTName: z.string().min(1, "Third name is required"),
  ownerFoName: z.string().optional(),
  passport: z.string().min(1, "Passport is required"),
  natId: z.string().optional(),
  residNum: z.string().optional(),
  ownerEnteringDate: z.coerce.date().optional(),
  passportIssueDate: z.coerce.date().optional(),
  ownerResEndDate: z.coerce.date().optional(),
  ownerEmail: z.string().email().optional().or(z.literal("")),

  // Car Details
  carType: z.string().min(1, "Car type is required"),
  carModel: z.string().min(1, "Car model is required"),
  chaseNum: z.string().min(1, "Chase number is required"),
  carColor: z.string().optional(),
  plateNum: z.string().optional(),
  engineNum: z.string().optional(),
  carValue: z.string().optional(),
  carRegCoun: z.string().optional(),

  // Book (Carnet) Details
  carnetNo: z.string().min(1, "Carnet number is required"),
  bookDate: z.coerce.date(),
  bookType: bookTypeEnum.default("عادي"),
  shippingPort: z.string().optional(),
  arrivalDest: z.string().optional(),
  portAccess: z.string().optional(),
  shipName: z.string().optional(),
  navAgent: z.string().optional(),
  DeliveryAuthNum: z.string().optional(),

  // Addresses
  addressKsa: addressKsaSchema.optional(),
  addressSudan: addressSudanSchema.optional(),

  // Relatives
  relative1: relativeSchema.optional(),
  relative2: relativeSchema.optional(),

  // System Fields
  state: customerStateEnum.default("New"),
  threeMonthEx: z.boolean().default(false),
  enteringDate: z.coerce.date().optional(),
  leftDate: z.coerce.date().optional(),
  clearDate: z.coerce.date().optional(),

  // Calculated Fields
  stayingTime: z.number().default(0),
  availableTime: z.number().default(90),

  // Search
  keywords: z.array(z.string()).optional(),
});

// --- Derived Types ---

export type Customer = z.infer<typeof customerSchema>;
export type CreateCustomerInput = z.input<typeof customerSchema>;
export type CustomerState = z.infer<typeof customerStateEnum>;
export type BookType = z.infer<typeof bookTypeEnum>;
export type AddressKsa = z.infer<typeof addressKsaSchema>;
export type AddressSudan = z.infer<typeof addressSudanSchema>;
export type Relative = z.infer<typeof relativeSchema>;
