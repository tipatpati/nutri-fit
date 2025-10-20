import { Bell, ShoppingCart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/shared/stores/useCartStore";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

export const HeaderActions = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const user = useAuthStore((state) => state.user);

  const handleCartClick = () => {
    navigate('/order');
  };

  return (
    <div className="hidden lg:flex items-center gap-[8px]">
      <Button variant="text" size="icon" className="relative text-on-surface-variant">
        <Globe className="h-5 w-5" />
      </Button>
      
      <Button variant="text" size="icon" className="relative text-on-surface-variant">
        <Bell className="h-5 w-5" />
        <span 
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center md-label-small"
          style={{
            background: 'hsl(var(--md-sys-color-secondary))',
            color: 'hsl(var(--md-sys-color-on-secondary))'
          }}
        >
          2
        </span>
      </Button>
      
      <Button 
        variant="text" 
        size="icon" 
        className="relative text-on-surface-variant"
        onClick={handleCartClick}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center md-label-small"
            style={{
              background: 'hsl(var(--md-sys-color-secondary))',
              color: 'hsl(var(--md-sys-color-on-secondary))'
            }}
          >
            {totalItems}
          </span>
        )}
      </Button>

      {!user ? (
        <>
          <Link to="/auth">
            <Button variant="text" className="text-on-surface-variant">Connexion</Button>
          </Link>
          <Link to="/auth">
            <Button 
              variant="filled" 
              style={{
                background: `linear-gradient(135deg, hsl(var(--md-sys-color-secondary)), hsl(var(--md-sys-color-tertiary)))`,
                color: 'hsl(var(--md-sys-color-on-secondary))'
              }}
            >
              S'inscrire
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/orders">
            <Button variant="text" className="text-on-surface-variant">Mes Commandes</Button>
          </Link>
          <Link to="/profile">
            <Button variant="text" className="text-on-surface-variant">Mon Profil</Button>
          </Link>
          <Button variant="text" className="text-on-surface-variant" onClick={() => useAuthStore.getState().signOut()}>
            Déconnexion
          </Button>
        </>
      )}
    </div>
  );
};
