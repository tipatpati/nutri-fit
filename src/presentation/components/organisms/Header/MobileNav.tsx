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
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-64 bg-md-surface-container-low md-elevation-2 p-md-4">
        <div className="flex justify-end mb-md-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col gap-md-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`px-md-3 py-md-2 rounded-md-2 transition-colors md-state-layer ${
                  isActive
                    ? "bg-md-surface-container-high text-md-primary"
                    : "text-md-surface-on-surface hover:bg-md-surface-container"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
