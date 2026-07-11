import { z } from "zod";

/**
 * Password requirements:
 * - Minimum 8 characters
 * - Contains uppercase, lowercase, number, and special character
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validates registration form data:
 * email, fullname, password, and password confirmation.
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .pipe(z.email("Invalid email address")),

    fullname: z
      .string()
      .nonempty("A full name is required")
      .min(4, "Fullname should be more than 4 characters"),

    password: z
      .string()
      .nonempty("Please enter a valid password")
      .min(8, "Password must contain at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number, and special character",
      ),

    confirmPassword: z
      .string()
      .nonempty("Please confirm your password")
      .min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "The password does not match",
    path: ["confirmPassword"],
  });

/**
 * Validates email input for password recovery requests.
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

/**
 * Validates email input when requesting a new verification token.
 */
export const resendEmailTokenSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

/**
 * Validates email verification token.
 */
export const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(6, "Verification code must contain 6 digits")
    .max(6, "Verification code must contain 6 digits"),
});

/**
 * Validates password reset form data.
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Please enter a valid password")
      .min(8, "Password must contain at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number, and special character",
      ),

    confirmPassword: z
      .string()
      .nonempty("Please confirm your password")
      .min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "The password does not match",
    path: ["confirmPassword"],
  });

/**
 * Form data types inferred from Zod schemas.
 */
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ResendEmailTokenFormData = z.infer<typeof resendEmailTokenSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
