import { describe, it, expect } from 'vitest';
import { addressSchema, phoneSchema, mealSchema } from '@/shared/validation/orderSchema';

describe('Order Schema Validation', () => {
  describe('addressSchema', () => {
    const validAddress = {
      street: '123 Rue de la République',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
    };

    it('should accept valid address', () => {
      const result = addressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
    });

    it('should reject missing street', () => {
      const result = addressSchema.safeParse({
        ...validAddress,
        street: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing city', () => {
      const result = addressSchema.safeParse({
        ...validAddress,
        city: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short postal code', () => {
      const result = addressSchema.safeParse({
        ...validAddress,
        postalCode: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should trim whitespace from fields', () => {
      const result = addressSchema.safeParse({
        ...validAddress,
        street: '  123 Rue de la République  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.street).toBe('123 Rue de la République');
      }
    });

    it('should accept optional instructions', () => {
      const result = addressSchema.safeParse({
        ...validAddress,
        instructions: 'Sonnez au portail',
      });
      expect(result.success).toBe(true);
    });

    it('should reject instructions exceeding max length', () => {
      const result = addressSchema.safeParse({
        ...validAddress,
        instructions: 'a'.repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('phoneSchema', () => {
    it('should accept valid phone numbers', () => {
      const validPhones = [
        '+33 1 23 45 67 89',
        '0123456789',
        '+213 123 456 789',
        '(123) 456-7890',
      ];

      validPhones.forEach(phone => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(true);
      });
    });

    it('should reject short phone numbers', () => {
      const result = phoneSchema.safeParse('123456');
      expect(result.success).toBe(false);
    });

    it('should reject phone with invalid characters', () => {
      const result = phoneSchema.safeParse('123-456-abcd');
      expect(result.success).toBe(false);
    });

    it('should trim whitespace', () => {
      const result = phoneSchema.safeParse('  0123456789  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('0123456789');
      }
    });
  });

  describe('mealSchema', () => {
    const validMeal = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Poulet grillé',
      quantity: 2,
      date: '2025-12-31',
    };

    it('should accept valid meal', () => {
      const result = mealSchema.safeParse(validMeal);
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID', () => {
      const result = mealSchema.safeParse({
        ...validMeal,
        id: 'invalid-uuid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject zero quantity', () => {
      const result = mealSchema.safeParse({
        ...validMeal,
        quantity: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative quantity', () => {
      const result = mealSchema.safeParse({
        ...validMeal,
        quantity: -1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject quantity over 20', () => {
      const result = mealSchema.safeParse({
        ...validMeal,
        quantity: 21,
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid date format', () => {
      const result = mealSchema.safeParse({
        ...validMeal,
        date: '31/12/2025',
      });
      expect(result.success).toBe(false);
    });
  });
});
