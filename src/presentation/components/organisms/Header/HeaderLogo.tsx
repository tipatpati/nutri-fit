import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group">
      <Utensils className="h-8 w-8 text-[#DE6E27] group-hover:scale-110 transition-transform duration-200" />
      <span className="text-2xl font-bold text-[#2B3210] font-heading">NutriFit</span>
    </Link>
  );
};
