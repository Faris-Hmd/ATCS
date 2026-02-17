import { z } from "zod";

// --- Enums ---

export const userRoleEnum = z.enum(["user", "admin", "manager"]);

// --- Main User Schema ---

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please add a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  googleId: z.string().optional(),
  role: userRoleEnum.default("user"),
  permissions: z.array(z.string()).default([]),
  createdAt: z.coerce.date().default(() => new Date()),
});

// --- Derived Types ---

export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.input<typeof userSchema>;
export type UserRole = z.infer<typeof userRoleEnum>;
