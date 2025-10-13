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
    <div className="hidden lg:flex items-center gap-2">
      <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-white/10">
        <Globe className="h-5 w-5" />
      </Button>
      
      <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-white/10">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-medium">
          2
        </span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-gray-300 hover:text-white hover:bg-white/10"
        onClick={handleCartClick}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-medium">
            {totalItems}
          </span>
        )}
      </Button>

      {!user ? (
        <>
          <Link to="/auth">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Connexion</Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold">S'inscrire</Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/orders">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Mes Commandes</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Mon Profil</Button>
          </Link>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" onClick={() => useAuthStore.getState().signOut()}>
            Déconnexion
          </Button>
        </>
      )}
    </div>
  );
};
