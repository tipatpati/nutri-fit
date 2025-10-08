import { z } from 'zod';

export const phoneSchema = z
  .string()
  .trim()
  .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
  .max(20, "Le numéro de téléphone doit contenir moins de 20 caractères")
  .regex(/^[\d\s\-\+\(\)]+$/, "Le numéro de téléphone contient des caractères invalides");

export const addressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(1, "L'adresse est requise")
    .max(200, "L'adresse doit contenir moins de 200 caractères"),
  city: z
    .string()
    .trim()
    .min(1, "La ville est requise")
    .max(100, "La ville doit contenir moins de 100 caractères"),
  postalCode: z
    .string()
    .trim()
    .min(4, "Le code postal doit contenir au moins 4 caractères")
    .max(10, "Le code postal doit contenir moins de 10 caractères"),
  country: z
    .string()
    .trim()
    .min(1, "Le pays est requis")
    .max(100, "Le pays doit contenir moins de 100 caractères"),
  instructions: z
    .string()
    .trim()
    .max(500, "Les instructions doivent contenir moins de 500 caractères")
    .optional()
});

export const mealSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1),
  quantity: z.number().int().positive().min(1).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide")
});

export const orderSchema = z.object({
  meals: z
    .array(mealSchema)
    .min(1, "Sélectionnez au moins un repas")
    .max(50, "Vous ne pouvez pas commander plus de 50 repas à la fois"),
  deliveryDate: z
    .date()
    .refine(date => date > new Date(), {
      message: "La date de livraison doit être dans le futur"
    }),
  address: addressSchema,
  phone: phoneSchema,
  notes: z
    .string()
    .trim()
    .max(500, "Les notes doivent contenir moins de 500 caractères")
    .optional()
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
