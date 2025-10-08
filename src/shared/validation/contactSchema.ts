import { z } from 'zod';
import { phoneSchema } from './orderSchema';

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Le nom doit contenir au moins 2 caractères")
  .max(100, "Le nom doit contenir moins de 100 caractères")
  .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Le nom contient des caractères invalides");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "L'email est requis")
  .email("Veuillez entrer une adresse email valide")
  .max(255, "L'email doit contenir moins de 255 caractères");

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z
    .string()
    .trim()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(200, "Le sujet doit contenir moins de 200 caractères")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message doit contenir moins de 1000 caractères")
});

export type ContactFormData = z.infer<typeof contactSchema>;
