import { LucideIcon } from "lucide-react";
import { ComponentType, ReactElement } from "react";

interface TrustBadgeProps {
  icon?: LucideIcon | string | ComponentType<any>;
  iconComponent?: ReactElement;
  label: string;
  iconColor?: string;
}

export const TrustBadge = ({ icon: Icon, iconComponent, label, iconColor = "text-on-surface" }: TrustBadgeProps) => {
  return (
    <div className="text-center space-y-3 group">
      <div className="w-16 h-16 mx-auto rounded-full bg-white/80 backdrop-blur-sm border border-[#DE6E27]/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
        {iconComponent ? (
          <span className="text-[#505631]">{iconComponent}</span>
        ) : typeof Icon === 'string' ? (
          <span className="text-xl text-[#DE6E27]">{Icon}</span>
        ) : Icon ? (
          <Icon className="w-6 h-6 text-[#DE6E27]" size={24} />
        ) : null}
      </div>
      <p className="text-sm font-semibold text-[#505631] group-hover:text-[#DE6E27] transition-colors">{label}</p>
    </div>
  );
};
