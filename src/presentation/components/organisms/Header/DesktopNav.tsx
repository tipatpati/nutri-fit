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
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
