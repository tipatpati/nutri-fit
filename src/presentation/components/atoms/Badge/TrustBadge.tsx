import { LucideIcon } from "lucide-react";
import { ComponentType } from "react";

interface TrustBadgeProps {
  icon: LucideIcon | string | ComponentType<any>;
  label: string;
  iconColor?: string;
}

export const TrustBadge = ({ icon: Icon, label, iconColor = "text-md-primary" }: TrustBadgeProps) => {
  return (
    <div className="text-center space-y-md-2 group">
      <div className="w-12 h-12 lg:w-14 lg:h-14 mx-auto md-surface-container-low backdrop-blur rounded-xl lg:rounded-[16px] flex items-center justify-center border border-md-outline-variant group-hover:scale-110 transition-all duration-300">
        {typeof Icon === 'string' ? (
          <span className="text-xl lg:text-2xl">{Icon}</span>
        ) : (
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${iconColor}`} size={24} />
        )}
      </div>
      <p className="md-label-medium text-gray-200">{label}</p>
    </div>
  );
};
