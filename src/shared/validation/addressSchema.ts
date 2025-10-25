import { z } from 'zod';

export const addressFormSchema = z.object({
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  street: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  postalCode: z.string().min(5, "Code postal invalide"),
  country: z.string().default("Algérie"),
  instructions: z.string().optional(),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;
