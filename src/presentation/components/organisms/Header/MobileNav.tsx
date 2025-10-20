import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Forfaits", path: "/forfaits" },
  { label: "Commander", path: "/order" },
];

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 lg:hidden animate-fade-in" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
      id="mobile-navigation"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav 
        className="absolute right-0 top-0 h-full w-64 sm:w-80 glass-surface-elevated md-elevation-4 p-md-4 sm:p-md-6 animate-slide-in-right"
        aria-label="Navigation mobile"
      >
        <h2 id="mobile-nav-title" className="sr-only">Menu de navigation</h2>
        <div className="flex justify-end mb-md-6">
          <Button 
            variant="text" 
            size="icon" 
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col gap-md-3" role="navigation">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`min-h-[48px] flex items-center px-md-4 py-md-3 rounded-md-3 transition-standard md-state-layer md-label-large animate-slide-in-right ${
                  isActive
                    ? "bg-md-primary-container text-md-on-primary-container font-semibold"
                    : "text-md-on-surface hover:bg-md-surface-container-highest"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </nav>
    </div>
  );
};
