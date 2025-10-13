import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDeliveryHistory = () => {
  return useQuery({
    queryKey: ['delivery-history'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: routes, error } = await supabase
        .from('delivery_routes')
        .select(`
          *,
          delivery_assignments(
            delivery_status
          )
        `)
        .eq('status', 'completed')
        .gte('delivery_date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('delivery_date', { ascending: false });

      if (error) throw error;

      const history = routes?.map(route => {
        const assignments = route.delivery_assignments || [];
        const successCount = assignments.filter((a: any) => a.delivery_status === 'delivered').length;
        const totalCount = assignments.length;
        
        return {
          date: new Date(route.delivery_date).toLocaleDateString('fr-FR'),
          deliveries: totalCount,
          completed: successCount,
          avgTime: route.total_distance_km ? `${Math.floor(route.total_distance_km * 3)} min` : '--',
          efficiency: totalCount > 0 ? `${Math.round((successCount / totalCount) * 100)}%` : '0%',
        };
      }) || [];

      // Calculate weekly average
      const totalDeliveries = history.reduce((sum, h) => sum + h.deliveries, 0);
      const totalCompleted = history.reduce((sum, h) => sum + h.completed, 0);
      const weeklyAvg = history.length > 0 ? Math.round(totalDeliveries / Math.ceil(history.length / 7)) : 0;
      const completionRate = totalDeliveries > 0 ? Math.round((totalCompleted / totalDeliveries) * 100) : 0;

      return {
        history,
        weeklyStats: {
          avgDeliveries: weeklyAvg,
          completionRate: `${completionRate}%`,
          totalDeliveries,
        },
      };
    },
  });
};
