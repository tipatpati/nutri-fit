import { describe, it, expect } from 'vitest';
import { contactSchema, nameSchema, emailSchema } from '@/shared/validation/contactSchema';

describe('Contact Schema Validation', () => {
  describe('nameSchema', () => {
    it('should accept valid names', () => {
      const validNames = [
        'Jean Dupont',
        'Marie-Claire',
        "O'Connor",
        'José García',
      ];

      validNames.forEach(name => {
        const result = nameSchema.safeParse(name);
        expect(result.success).toBe(true);
      });
    });

    it('should reject names shorter than 2 characters', () => {
      const result = nameSchema.safeParse('A');
      expect(result.success).toBe(false);
    });

    it('should reject names with numbers', () => {
      const result = nameSchema.safeParse('Jean123');
      expect(result.success).toBe(false);
    });

    it('should reject names with special characters', () => {
      const result = nameSchema.safeParse('Jean@Dupont');
      expect(result.success).toBe(false);
    });

    it('should trim whitespace', () => {
      const result = nameSchema.safeParse('  Jean Dupont  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('Jean Dupont');
      }
    });

    it('should reject names exceeding max length', () => {
      const result = nameSchema.safeParse('a'.repeat(101));
      expect(result.success).toBe(false);
    });
  });

  describe('emailSchema', () => {
    it('should accept valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user+tag@domain.co.uk',
        'first.last@subdomain.domain.com',
      ];

      validEmails.forEach(email => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        '@domain.com',
        'user@',
        'user @domain.com',
      ];

      invalidEmails.forEach(email => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('contactSchema', () => {
    const validContact = {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      message: 'Ceci est un message de test avec au moins 10 caractères.',
    };

    it('should accept valid contact form', () => {
      const result = contactSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it('should accept optional phone', () => {
      const result = contactSchema.safeParse({
        ...validContact,
        phone: '+33 1 23 45 67 89',
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional subject', () => {
      const result = contactSchema.safeParse({
        ...validContact,
        subject: 'Question sur les forfaits',
      });
      expect(result.success).toBe(true);
    });

    it('should reject message shorter than 10 characters', () => {
      const result = contactSchema.safeParse({
        ...validContact,
        message: 'Court',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message exceeding max length', () => {
      const result = contactSchema.safeParse({
        ...validContact,
        message: 'a'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it('should trim all text fields', () => {
      const result = contactSchema.safeParse({
        name: '  Jean Dupont  ',
        email: '  jean@example.com  ',
        message: '  Message de test avec suffisamment de caractères  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Jean Dupont');
        expect(result.data.email).toBe('jean@example.com');
        expect(result.data.message).not.toMatch(/^\s|\s$/);
      }
    });
  });
});
