import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Utensils className="h-7 w-7 text-orange-500" />
      <span className="text-xl font-bold text-white">NutriFit</span>
    </Link>
  );
};
