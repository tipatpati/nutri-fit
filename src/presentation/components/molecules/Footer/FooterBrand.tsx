import { brandInfo } from "@/shared/data/footerData";
import { FooterTrustBadges } from "./FooterTrustBadges";
import { FooterSocial } from "./FooterSocial";
import { Dumbbell } from "lucide-react";

export const FooterBrand = () => {
  return (
    <div className="space-y-md-6">
      <div className="flex items-center gap-md-3">
        <div className="w-12 h-12 bg-gradient-to-br from-md-primary to-md-tertiary rounded-md-lg flex items-center justify-center md-elevation-2">
          <Dumbbell className="w-6 h-6 text-white" />
        </div>
        <h3 className="md-headline-medium bg-gradient-to-r from-md-primary to-md-tertiary bg-clip-text text-transparent">
          {brandInfo.name}
        </h3>
      </div>
      
      <p className="md-body-medium text-md-on-surface-variant leading-relaxed">
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
