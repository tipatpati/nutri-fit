import { brandInfo } from "@/shared/data/footerData";
import { FooterTrustBadges } from "./FooterTrustBadges";
import { FooterSocial } from "./FooterSocial";
import { Dumbbell } from "lucide-react";

export const FooterBrand = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] rounded-xl flex items-center justify-center shadow-lg">
          <Dumbbell className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#FBF8EF] font-['Space_Grotesk']">
          {brandInfo.name}
        </h3>
      </div>
      
      <p className="text-sm text-[#FBF8EF]/80 leading-relaxed max-w-xs font-['DM_Sans']">
        {brandInfo.tagline}
      </p>

      <FooterSocial />
    </div>
  );
};
