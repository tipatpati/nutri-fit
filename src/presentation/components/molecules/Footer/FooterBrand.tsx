import { brandInfo } from "@/shared/data/footerData";
import { FooterTrustBadges } from "./FooterTrustBadges";
import { FooterSocial } from "./FooterSocial";
import { Dumbbell } from "lucide-react";

export const FooterBrand = () => {
  return (
    <div className="space-y-md-6">
      <div className="flex items-center gap-md-3">
        <div className="w-12 h-12 bg-gradient-to-br from-md-tertiary to-md-secondary rounded-md-lg flex items-center justify-center md-elevation-2">
          <Dumbbell className="w-6 h-6 text-white" />
        </div>
        <h3 className="md-headline-medium text-white font-bold">
          {brandInfo.name}
        </h3>
      </div>
      
      <p className="md-body-medium text-white/90 leading-relaxed">
        {brandInfo.tagline}
      </p>

      <FooterTrustBadges />

      <div>
        <h4 className="md-label-small text-md-on-surface-variant mb-md-3">Suivez-nous</h4>
        <FooterSocial />
      </div>
    </div>
  );
};
