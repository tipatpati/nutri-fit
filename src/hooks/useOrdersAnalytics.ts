import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useOrdersAnalytics = () => {
  return useQuery({
    queryKey: ['orders-analytics'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Fetch today's orders
      const { data: todayOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch this month's statistics
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const { data: monthOrders, error: monthError } = await supabase
        .from('orders')
        .select('total_amount, status')
        .gte('created_at', firstDayOfMonth.toISOString())
        .neq('status', 'draft');

      if (monthError) throw monthError;

      // Calculate stats
      const totalRevenue = monthOrders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;
      const totalOrders = monthOrders?.length || 0;
      
      // Count pending deliveries (orders that are ready or in transit)
      const pendingDeliveries = todayOrders?.filter(
        order => ['ready', 'dispatched'].includes(order.status)
      ).length || 0;

      // Fetch profiles for customers
      const userIds = todayOrders?.map(o => o.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      // Format recent orders
      const recentOrders = todayOrders?.slice(0, 5).map(order => {
        const profile = profileMap.get(order.user_id);
        return {
          id: order.order_number,
          customer: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 'Client',
          total: `€${Number(order.total_amount || 0).toFixed(2)}`,
          status: getOrderStatusLabel(order.status),
          time: new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
      }) || [];

      return {
        totalRevenue: `€${totalRevenue.toFixed(2)}`,
        totalOrders,
        pendingDeliveries,
        recentOrders
      };
    }
  });
};

const getOrderStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'Brouillon',
    confirmed: 'Confirmé',
    preparing: 'En préparation',
    ready: 'Prêt',
    dispatched: 'En route',
    delivered: 'Livré',
    cancelled: 'Annulé'
  };
  return statusMap[status] || status;
};
