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
    <div className="text-center space-y-2">
      <div className="w-12 h-12 mx-auto glass-card flex items-center justify-center transition-transform duration-200 hover:scale-105">
        {iconComponent ? (
          <span className="text-md-tertiary">{iconComponent}</span>
        ) : typeof Icon === 'string' ? (
          <span className="text-lg text-md-secondary">{Icon}</span>
        ) : Icon ? (
          <Icon className={`w-5 h-5 text-md-secondary`} size={20} />
        ) : null}
      </div>
      <p className="text-xs font-medium text-on-surface-variant">{label}</p>
    </div>
  );
};
