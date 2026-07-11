import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("An email is required")
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .nonempty("enter a valid password")
    .min(4, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
