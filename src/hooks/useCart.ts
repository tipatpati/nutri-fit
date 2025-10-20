import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  mealId: string;
  mealName: string;
  mealImage: string;
  category: string;
  premium: boolean;
  quantity: number;
  unitPrice: number;
  nutritionalGoal: 'equilibre' | 'perte_poids' | 'prise_masse';
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  deliveryDate?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateDeliveryDate: (itemId: string, date: string) => void;
  clearCart: () => void;
  getCartSummary: () => {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
  };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.mealId === newItem.mealId && 
                  item.nutritionalGoal === newItem.nutritionalGoal
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
          toast({
            title: "Quantité mise à jour",
            description: `${newItem.mealName} (x${existingItem.quantity + newItem.quantity})`,
          });
        } else {
          const cartItem: CartItem = {
            ...newItem,
            id: `${newItem.mealId}-${Date.now()}`,
          };
          set({ items: [...items, cartItem] });
          toast({
            title: "Ajouté au panier",
            description: newItem.mealName,
          });
        }

        // Update totals
        const updatedItems = get().items;
        const total = updatedItems.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        );
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        set({ total, itemCount });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId),
        }));
        const items = get().items;
        const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ total, itemCount });
        toast({
          title: "Retiré du panier",
          description: "L'article a été supprimé",
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
        const items = get().items;
        const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ total, itemCount });
      },

      updateDeliveryDate: (itemId, date) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, deliveryDate: date } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
        toast({
          title: "Panier vidé",
          description: "Tous les articles ont été supprimés",
        });
      },

      getCartSummary: () => {
        const items = get().items;
        const subtotal = items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        );
        const deliveryFee = 0; // Free delivery
        const discount = 0;
        const total = subtotal + deliveryFee - discount;

        return { subtotal, deliveryFee, discount, total };
      },
    }),
    {
      name: 'nutrifit-cart',
    }
  )
);
