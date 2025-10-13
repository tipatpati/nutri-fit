import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface OrderItem {
  id: string;
  meal_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  meals: {
    name: string;
    image_url: string | null;
    category: string;
  };
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  delivery_date: string | null;
  created_at: string;
  delivery_address_id: string | null;
  order_items: OrderItem[];
  addresses: {
    street_address: string;
    city: string;
    postal_code: string;
    country: string;
  } | null;
}

export const useCustomerOrders = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['customer-orders', userId],
    queryFn: async (): Promise<Order[]> => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          subtotal,
          delivery_fee,
          total_amount,
          delivery_date,
          created_at,
          delivery_address_id,
          order_items (
            id,
            meal_id,
            quantity,
            unit_price,
            total_price,
            meals (
              name,
              image_url,
              category
            )
          ),
          addresses (
            street_address,
            city,
            postal_code,
            country
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!userId,
    staleTime: 30 * 1000, // 30 seconds
  });
};
