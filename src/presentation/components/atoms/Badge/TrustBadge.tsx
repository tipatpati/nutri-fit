import { LucideIcon } from "lucide-react";
import { ComponentType, ReactElement } from "react";

interface TrustBadgeProps {
  icon?: LucideIcon | string | ComponentType<any>;
  iconComponent?: ReactElement;
  label: string;
  iconColor?: string;
}

export const TrustBadge = ({ icon: Icon, iconComponent, label, iconColor = "text-white" }: TrustBadgeProps) => {
  return (
    <div className="text-center space-y-2">
      <div className="w-12 h-12 mx-auto bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 transition-transform duration-200 hover:scale-105">
        {iconComponent ? (
          iconComponent
        ) : typeof Icon === 'string' ? (
          <span className="text-lg text-white">{Icon}</span>
        ) : Icon ? (
          <Icon className={`w-5 h-5 ${iconColor}`} size={20} />
        ) : null}
      </div>
      <p className="text-xs font-medium text-gray-300">{label}</p>
    </div>
  );
};
