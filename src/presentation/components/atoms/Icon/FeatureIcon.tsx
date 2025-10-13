import { Icon } from "@/components/ui/icon";

interface FeatureIconProps {
  icon: string;
  className?: string;
}

export const FeatureIcon = ({ icon, className = '' }: FeatureIconProps) => {
  return (
    <div className={`w-20 h-20 mx-auto bg-gradient-to-br from-[hsl(var(--md-sys-color-primary-container))] to-[hsl(var(--md-sys-color-secondary-container))] rounded-[var(--md-sys-shape-corner-extra-large)] flex items-center justify-center md-elevation-2 group-hover:md-elevation-3 group-hover:scale-110 transition-all duration-300 ${className}`}>
      <Icon name={icon as any} size={40} className="brightness-0 opacity-70" />
    </div>
  );
};
