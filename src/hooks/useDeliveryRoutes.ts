import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDeliveryRoutes = (date: string) => {
  return useQuery({
    queryKey: ['delivery-routes', date],
    queryFn: async () => {
      const { data: routes, error } = await supabase
        .from('delivery_routes')
        .select(`
          *,
          delivery_zones(name),
          delivery_assignments(
            *,
            orders(
              *,
              addresses(
                street_address,
                city,
                postal_code
              ),
              profiles(
                first_name,
                last_name
              )
            )
          )
        `)
        .eq('delivery_date', date)
        .order('start_time');

      if (error) throw error;

      // Fetch driver profiles
      const driverIds = routes?.map(r => r.driver_id).filter(Boolean) as string[] || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name')
        .in('user_id', driverIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      const formattedRoutes = routes?.map(route => {
        const profile = route.driver_id ? profileMap.get(route.driver_id) : null;
        const assignments = route.delivery_assignments || [];
        
        return {
          id: route.id,
          zone: route.delivery_zones?.name || 'Zone non définie',
          deliveries: assignments.length,
          estimatedTime: `${Math.floor((route.total_distance_km || 0) * 3)} min`,
          distance: `${route.total_distance_km || 0} km`,
          status: getStatusLabel(route.status),
          assignments: assignments.map((a: any) => ({
            id: a.id,
            customer: a.orders?.profiles 
              ? `${a.orders.profiles.first_name} ${a.orders.profiles.last_name}`
              : 'Client',
            address: a.orders?.addresses 
              ? `${a.orders.addresses.street_address}, ${a.orders.addresses.city}`
              : 'Adresse non définie',
            time: a.estimated_arrival ? new Date(a.estimated_arrival).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--',
            status: getDeliveryStatusLabel(a.delivery_status),
          })),
        };
      }) || [];

      // Calculate statistics
      const totalDeliveries = formattedRoutes.reduce((sum, r) => sum + r.deliveries, 0);
      const pendingCount = routes?.filter(r => r.status === 'planned').length || 0;
      const inProgressCount = routes?.filter(r => r.status === 'in_progress').length || 0;
      const completedCount = routes?.filter(r => r.status === 'completed').length || 0;

      return {
        routes: formattedRoutes,
        stats: {
          pending: pendingCount,
          inProgress: inProgressCount,
          completed: completedCount,
          total: totalDeliveries,
        },
      };
    },
  });
};

const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    planned: 'Planifié',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  };
  return statusMap[status] || status;
};

const getDeliveryStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'En attente',
    in_transit: 'En route',
    delivered: 'Livré',
    failed: 'Échec',
  };
  return statusMap[status] || status;
};
