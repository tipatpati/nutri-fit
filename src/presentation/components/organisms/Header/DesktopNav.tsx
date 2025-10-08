import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Forfaits", path: "/forfaits" },
  { label: "Commander", path: "/order" },
];

export const DesktopNav = () => {
  const location = useLocation();

  return (
    <nav className="hidden lg:flex items-center gap-md-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
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
  );
};
