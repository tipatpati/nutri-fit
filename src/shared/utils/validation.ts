/**
 * Input Validation Utilities
 * SECURITY: All user inputs must be validated
 */

import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .trim()
  .email({ message: "Adresse email invalide" })
  .max(255, { message: "L'email doit contenir moins de 255 caractères" });

/**
 * Phone validation schema (French format)
 */
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^(\+213|0)[5-7][0-9]{8}$/, { 
    message: "Numéro de téléphone invalide (format: +213XXXXXXXXX ou 0XXXXXXXXX)" 
  });

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
  .max(100, { message: "Le nom doit contenir moins de 100 caractères" })
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { 
    message: "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes" 
  });

/**
 * Address validation schema
 */
export const addressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(5, { message: "L'adresse doit contenir au moins 5 caractères" })
    .max(200, { message: "L'adresse doit contenir moins de 200 caractères" }),
  city: z
    .string()
    .trim()
    .min(2, { message: "La ville doit contenir au moins 2 caractères" })
    .max(100, { message: "La ville doit contenir moins de 100 caractères" }),
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{5}$/, { message: "Code postal invalide (5 chiffres)" }),
  country: z
    .string()
    .trim()
    .default("Algérie"),
  instructions: z
    .string()
    .trim()
    .max(500, { message: "Les instructions doivent contenir moins de 500 caractères" })
    .optional(),
});

/**
 * Password validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .max(128, { message: "Le mot de passe doit contenir moins de 128 caractères" })
  .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
  .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule" })
  .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" });

/**
 * Sanitize HTML to prevent XSS attacks
 * NEVER use dangerouslySetInnerHTML without sanitization
 */
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Encode URL parameters safely
 */
export const encodeUrlParam = (param: string): string => {
  return encodeURIComponent(param);
};

/**
 * Validate and sanitize file uploads
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = options;

  if (file.size > maxSize) {
    return { valid: false, error: `La taille du fichier ne doit pas dépasser ${maxSize / 1024 / 1024}MB` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}` };
  }

  return { valid: true };
};
