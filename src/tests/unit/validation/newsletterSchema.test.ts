import { describe, it, expect } from 'vitest';
import { newsletterSchema } from '@/shared/validation/newsletterSchema';

describe('Newsletter Schema Validation', () => {
  describe('email validation', () => {
    it('should accept valid email', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty email', () => {
      const result = newsletterSchema.safeParse({
        email: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('requis');
      }
    });

    it('should reject invalid email format', () => {
      const result = newsletterSchema.safeParse({
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valide');
      }
    });

    it('should reject email with spaces', () => {
      const result = newsletterSchema.safeParse({
        email: 'test @example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should trim whitespace from email', () => {
      const result = newsletterSchema.safeParse({
        email: '  test@example.com  ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
      }
    });

    it('should reject email exceeding max length', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = newsletterSchema.safeParse({
        email: longEmail,
      });
      expect(result.success).toBe(false);
    });
  });
});
