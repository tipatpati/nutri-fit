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
    <nav className="hidden lg:flex items-center gap-[4px]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`px-[16px] py-[8px] rounded-[var(--md-sys-shape-corner-medium)] md-label-large transition-md-fast ${
              isActive
                ? "text-on-surface glass-primary"
                : "text-on-surface-variant hover:text-on-surface hover:bg-[hsl(var(--md-sys-color-surface-container-high))]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
