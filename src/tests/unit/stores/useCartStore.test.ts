import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '@/shared/stores/useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({ items: [] });
  });

  describe('addItem', () => {
    it('should add item to empty cart', () => {
      const { addItem } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Test Meal',
        price: 15.99,
        quantity: 1,
        date: '2025-12-31',
      });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].mealName).toBe('Test Meal');
      expect(state.items[0].quantity).toBe(1);
    });

    it('should increment quantity if item already exists', () => {
      const { addItem } = useCartStore.getState();
      
      const item = {
        mealId: '1',
        mealName: 'Test Meal',
        price: 15.99,
        quantity: 1,
        date: '2025-12-31',
      };

      addItem(item);
      addItem(item);

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });

    it('should add multiple different items', () => {
      const { addItem } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Meal 1',
        price: 15.99,
        quantity: 1,
        date: '2025-12-31',
      });

      addItem({
        mealId: '2',
        mealName: 'Meal 2',
        price: 18.99,
        quantity: 1,
        date: '2025-12-31',
      });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(2);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { addItem, removeItem } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Test Meal',
        price: 15.99,
        quantity: 1,
        date: '2025-12-31',
      });

      removeItem('1', '2025-12-31');

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
    });

    it('should not error when removing non-existent item', () => {
      const { removeItem } = useCartStore.getState();
      
      expect(() => removeItem('non-existent', '2025-12-31')).not.toThrow();
    });
  });

  describe('updateQuantity', () => {
    beforeEach(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        mealId: '1',
        mealName: 'Test Meal',
        price: 15.99,
        quantity: 1,
        date: '2025-12-31',
      });
    });

    it('should update item quantity', () => {
      const { updateQuantity } = useCartStore.getState();
      
      updateQuantity('1', '2025-12-31', 5);

      const state = useCartStore.getState();
      expect(state.items[0].quantity).toBe(5);
    });

    it('should keep item when quantity is 0', () => {
      const { updateQuantity } = useCartStore.getState();
      
      updateQuantity('1', '2025-12-31', 0);

      const state = useCartStore.getState();
      // The store keeps the item even with 0 quantity
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const { addItem, clearCart } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Meal 1',
        price: 15.99,
        quantity: 2,
        date: '2025-12-31',
      });

      addItem({
        mealId: '2',
        mealName: 'Meal 2',
        price: 18.99,
        quantity: 1,
        date: '2025-12-31',
      });

      clearCart();

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
    });
  });

  describe('getTotalItems', () => {
    it('should return 0 for empty cart', () => {
      const { getTotalItems } = useCartStore.getState();
      expect(getTotalItems()).toBe(0);
    });

    it('should return total quantity of all items', () => {
      const { addItem, getTotalItems } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Meal 1',
        price: 15.99,
        quantity: 2,
        date: '2025-12-31',
      });

      addItem({
        mealId: '2',
        mealName: 'Meal 2',
        price: 18.99,
        quantity: 3,
        date: '2025-12-31',
      });

      expect(getTotalItems()).toBe(5);
    });
  });

  describe('getTotalPrice', () => {
    it('should return 0 for empty cart', () => {
      const { getTotalPrice } = useCartStore.getState();
      expect(getTotalPrice()).toBe(0);
    });

    it('should calculate total price correctly', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Meal 1',
        price: 15.00,
        quantity: 2,
        date: '2025-12-31',
      });

      addItem({
        mealId: '2',
        mealName: 'Meal 2',
        price: 20.00,
        quantity: 1,
        date: '2025-12-31',
      });

      expect(getTotalPrice()).toBe(50.00);
    });

    it('should handle decimal prices correctly', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();
      
      addItem({
        mealId: '1',
        mealName: 'Meal 1',
        price: 15.99,
        quantity: 2,
        date: '2025-12-31',
      });

      expect(getTotalPrice()).toBeCloseTo(31.98, 2);
    });
  });
});
