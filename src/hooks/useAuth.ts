import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const useAuth = () => {
  const { user, session, loading, setSession, setLoading, signOut: storeSignOut } = useAuthStore();

  useEffect(() => {
    const cleanAuthHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hasAuthHash = /access_token|refresh_token|type=recovery/.test(window.location.hash);
        if (hasAuthHash) {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Skip automatic session for PASSWORD_RECOVERY - let ResetPassword page handle it
        if (event === 'PASSWORD_RECOVERY') {
          setLoading(false);
          return;
        }
        
        setSession(session);
        setLoading(false);
        
        if (event === 'SIGNED_OUT') {
          storeSignOut();
        }
        
        // Clean hash only for normal sign-ins
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setTimeout(() => cleanAuthHash(), 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      // If we already have a session on load, ensure we clean any auth hash
      if (session?.user) {
        cleanAuthHash();
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading, storeSignOut]);

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