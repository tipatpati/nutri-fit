import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'email est requis")
    .email("Veuillez entrer une adresse email valide")
    .max(255, "L'email doit contenir moins de 255 caractères"),
  consent: z
    .boolean()
    .refine(val => val === true, {
      message: "Vous devez accepter de recevoir nos communications"
    })
    .optional()
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
