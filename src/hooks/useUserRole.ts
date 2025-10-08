import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/shared/stores/useAuthStore';

type UserRole = 'admin' | 'owner' | 'cook' | 'delivery_driver' | 'support';

interface UseUserRoleReturn {
  roles: UserRole[];
  loading: boolean;
  hasRole: (role: UserRole) => boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isCook: boolean;
  isDeliveryDriver: boolean;
  refreshRoles: () => Promise<void>;
}

export const useUserRole = (): UseUserRoleReturn => {
  const { user } = useAuthStore();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('active', true);

      if (error) throw error;

      const userRoles = data?.map(r => r.role as UserRole) || [];
      setRoles(userRoles);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [user]);

  const hasRole = (role: UserRole) => roles.includes(role);

  return {
    roles,
    loading,
    hasRole,
    isAdmin: hasRole('admin'),
    isOwner: hasRole('owner'),
    isCook: hasRole('cook'),
    isDeliveryDriver: hasRole('delivery_driver'),
    refreshRoles: fetchRoles,
  };
};
