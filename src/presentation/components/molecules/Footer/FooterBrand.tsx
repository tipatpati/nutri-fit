import { brandInfo } from "@/shared/data/footerData";
import { FooterTrustBadges } from "./FooterTrustBadges";
import { FooterSocial } from "./FooterSocial";
import { Dumbbell } from "lucide-react";

export const FooterBrand = () => {
  return (
    <div className="space-y-md-4">
      <div className="flex items-center gap-md-2">
        <div className="w-8 h-8 bg-gradient-to-br from-md-tertiary to-md-secondary rounded-md flex items-center justify-center">
          <Dumbbell className="w-4 h-4 text-white" />
        </div>
        <h3 className="md-title-large text-white font-bold">
          {brandInfo.name}
        </h3>
      </div>
      
      <p className="md-body-small text-white/80 leading-relaxed max-w-xs">
        {brandInfo.tagline}
      </p>

      <FooterSocial />
    </div>
  );
};
