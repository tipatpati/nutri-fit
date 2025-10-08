import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-md-2 md-state-layer rounded-md-2 px-md-2 py-md-1 -ml-md-2">
      <Utensils className="h-8 w-8 text-md-primary" />
      <span className="text-xl font-bold text-md-primary">NutriFit</span>
    </Link>
  );
};
