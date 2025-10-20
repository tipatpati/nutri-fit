/**
 * Validation Schemas Index
 * Central export point for all validation schemas
 */

export * from './newsletterSchema';
export * from './orderSchema';
export * from './contactSchema';

// Re-export commonly used schemas
export { 
  newsletterSchema, 
  type NewsletterFormData 
} from './newsletterSchema';

export {
  orderSchema,
  addressSchema,
  mealSchema,
  phoneSchema,
  type OrderFormData,
  type AddressFormData
} from './orderSchema';

export {
  contactSchema,
  nameSchema,
  emailSchema,
  type ContactFormData
} from './contactSchema';

export {
  addressFormSchema,
  type AddressFormData as CheckoutAddressFormData
} from './addressSchema';
