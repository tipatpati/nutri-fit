import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { startOfDay, endOfDay } from 'date-fns';

interface KitchenCapacity {
  date: string;
  totalOrders: number;
  maxCapacity: number;
  availableSlots: number;
}

export const useKitchenCapacity = (startDate: Date, endDate: Date) => {
  return useQuery({
    queryKey: ['kitchen-capacity', startDate.toISOString(), endDate.toISOString()],
    queryFn: async (): Promise<KitchenCapacity[]> => {
      // Fetch orders grouped by delivery date
      const { data: orders, error } = await supabase
        .from('orders')
        .select('delivery_date, id')
        .gte('delivery_date', startDate.toISOString().split('T')[0])
        .lte('delivery_date', endDate.toISOString().split('T')[0])
        .in('status', ['confirmed', 'preparing', 'ready', 'out_for_delivery']);

      if (error) throw error;

      // Group orders by date
      const ordersByDate = orders?.reduce((acc, order) => {
        const date = order.delivery_date;
        if (!acc[date]) acc[date] = 0;
        acc[date]++;
        return acc;
      }, {} as Record<string, number>) || {};

      // Generate capacity data for date range
      const capacities: KitchenCapacity[] = [];
      const currentDate = new Date(startDate);
      const maxCapacity = 50; // Default kitchen capacity

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const totalOrders = ordersByDate[dateStr] || 0;
        
        capacities.push({
          date: dateStr,
          totalOrders,
          maxCapacity,
          availableSlots: Math.max(0, maxCapacity - totalOrders),
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return capacities;
    },
    staleTime: 60 * 1000, // 1 minute
  });
};
