import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDeliveryData = () => {
  return useQuery({
    queryKey: ['delivery-data'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: routes, error } = await supabase
        .from('delivery_routes')
        .select(`
          *,
          delivery_zones(name)
        `)
        .gte('delivery_date', today.toISOString().split('T')[0])
        .in('status', ['planned', 'in_progress'])
        .order('delivery_date', { ascending: true });

      if (error) throw error;

      // Fetch driver profiles
      const driverIds = routes?.map(r => r.driver_id).filter(Boolean) as string[] || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name')
        .in('user_id', driverIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      const activeDeliveries = routes?.map(route => {
        const profile = route.driver_id ? profileMap.get(route.driver_id) : null;
        return {
          id: route.id.slice(0, 8).toUpperCase(),
          driver: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 'Chauffeur',
          zone: route.delivery_zones?.name || 'Zone non définie',
          orders: route.total_orders || 0,
          status: getDeliveryStatusLabel(route.status)
        };
      }) || [];

      return {
        activeDeliveries
      };
    }
  });
};

const getDeliveryStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    planned: 'En préparation',
    in_progress: 'En route',
    completed: 'Terminé',
    cancelled: 'Annulé'
  };
  return statusMap[status] || status;
};
