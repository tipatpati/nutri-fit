import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-md-fast">
      <Utensils className="h-7 w-7" style={{ color: 'hsl(var(--md-sys-color-secondary))' }} />
      <span className="md-title-large text-on-surface">NutriFit</span>
    </Link>
  );
};
