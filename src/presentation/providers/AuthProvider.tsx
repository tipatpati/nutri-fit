import { useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/shared/stores/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setSession, setLoading, signOut } = useAuthStore();

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
        console.log('[AuthProvider] Auth state changed:', event, 'Has session:', !!session);
        
        // Skip automatic session for PASSWORD_RECOVERY - let UpdatePassword page handle it
        if (event === 'PASSWORD_RECOVERY') {
          console.log('[AuthProvider] PASSWORD_RECOVERY event - preserving hash, skipping session');
          setLoading(false);
          // DO NOT clean hash - UpdatePassword component needs to read it first
          return;
        }
        
        setSession(session);
        setLoading(false);
        
        if (event === 'SIGNED_OUT') {
          console.log('[AuthProvider] User signed out');
          signOut();
        }
        
        // Clean hash only for normal sign-ins, NOT for recovery
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          console.log('[AuthProvider] Cleaning auth hash for:', event);
          setTimeout(() => cleanAuthHash(), 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only clean hash if not a recovery flow
      const isRecoveryFlow = window.location.hash.includes('type=recovery');
      
      if (!isRecoveryFlow) {
        setSession(session);
        setLoading(false);
        
        // Clean hash only if we have a session and it's not a recovery flow
        if (session?.user) {
          cleanAuthHash();
        }
      } else {
        console.log('[AuthProvider] Recovery flow detected, preserving hash');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading, signOut]);

  return <>{children}</>;
};
