import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'owner' | 'cook' | 'delivery_driver' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { hasRole, loading: roleLoading, isAdmin, isOwner } = useUserRole();
  const navigate = useNavigate();

  const loading = authLoading || roleLoading;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen md-surface flex items-center justify-center">
        <div className="text-md-surface-on-surface">Vérification de l'authentification...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Check role if required
  if (requiredRole) {
    const hasRequiredRole = hasRole(requiredRole) || isAdmin || isOwner;
    
    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen md-surface flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="mb-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Accès refusé</AlertTitle>
              <AlertDescription>
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate("/")} className="w-full">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};