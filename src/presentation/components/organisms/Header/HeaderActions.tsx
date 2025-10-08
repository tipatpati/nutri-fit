import { Bell, ShoppingCart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/shared/stores/useCartStore";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Link } from "react-router-dom";

export const HeaderActions = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const user = useAuthStore((state) => state.user);

  return (
    <div className="hidden lg:flex items-center gap-md-2">
      <Button variant="ghost" size="icon" className="relative">
        <Globe className="h-5 w-5" />
      </Button>
      
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-md-error text-md-error-on text-xs flex items-center justify-center">
          2
        </span>
      </Button>
      
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-md-primary text-md-primary-on text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {!user ? (
        <>
          <Link to="/auth">
            <Button variant="ghost">Connexion</Button>
          </Link>
          <Link to="/auth">
            <Button>S'inscrire</Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile">
            <Button variant="ghost">Mon Profil</Button>
          </Link>
          <Button variant="ghost" onClick={() => useAuthStore.getState().signOut()}>
            Déconnexion
          </Button>
        </>
      )}
    </div>
  );
};
