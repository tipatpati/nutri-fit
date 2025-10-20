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
      <div className="w-14 h-14 mx-auto rounded-full glass-icon-circle flex items-center justify-center transition-all duration-300">
        {iconComponent ? (
          <span className="text-md-tertiary">{iconComponent}</span>
        ) : typeof Icon === 'string' ? (
          <span className="text-lg text-md-secondary">{Icon}</span>
        ) : Icon ? (
          <Icon className={`w-5 h-5 text-md-secondary`} size={20} />
        ) : null}
      </div>
      <p className="text-xs font-semibold text-on-surface-variant group-hover:text-md-secondary transition-colors">{label}</p>
    </div>
  );
};
