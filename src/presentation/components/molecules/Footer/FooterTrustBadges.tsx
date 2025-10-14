import { TrustBadge } from "@/presentation/components/atoms/Badge/TrustBadge";
import { Award, Star, Leaf } from "lucide-react";

export const FooterTrustBadges = () => {
  return (
    <div className="flex gap-md-4 justify-start mt-md-6">
      <TrustBadge 
        icon={Award} 
        label="500+ clients" 
        iconColor="text-md-primary"
      />
      <TrustBadge 
        icon={Star} 
        label="4.8/5 étoiles" 
        iconColor="text-md-tertiary"
      />
      <TrustBadge 
        icon={Leaf} 
        label="100% Frais" 
        iconColor="text-md-secondary"
      />
    </div>
  );
};
