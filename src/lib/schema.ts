import { z } from 'zod';

// Email and phone validation schema
export const contactFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .refine((val) => val === '' || /^\d{3}-\d{3}-\d{4}$|^\d{3}-\d{3}$|^\d{3}$|^\d{10}$/.test(val), {
      message: 'Please enter a valid phone number (e.g., 412-977-8194)',
    })
    .optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// API response type
export type ApiResponse =
  | {
      status: 'success';
      message: string;
    }
  | {
      status: 'error';
      message: string;
      errors?: {
        email?: string;
        phone?: string;
      };
    };