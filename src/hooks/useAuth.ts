import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

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
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // After Supabase processes the URL hash, clean it up
        if (event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
          setTimeout(() => cleanAuthHash(), 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // If we already have a session on load, ensure we clean any auth hash
      if (session?.user) {
        cleanAuthHash();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user
  };
};