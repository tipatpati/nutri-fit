import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const useAuth = () => {
  const { user, session, loading, signOut: storeSignOut } = useAuthStore();

  const signOut = async () => {
    await supabase.auth.signOut();
    storeSignOut();
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user
  };
};