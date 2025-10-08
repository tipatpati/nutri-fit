import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  mealId: string;
  mealName: string;
  quantity: number;
  date: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (mealId: string, date: string) => void;
  updateQuantity: (mealId: string, date: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.mealId === item.mealId && i.date === item.date
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += item.quantity;
            return { items: newItems };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (mealId, date) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.mealId === mealId && item.date === date)
          ),
        })),

      updateQuantity: (mealId, date, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.mealId === mealId && item.date === date
              ? { ...item, quantity }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'nutrifit-cart',
    }
  )
);
