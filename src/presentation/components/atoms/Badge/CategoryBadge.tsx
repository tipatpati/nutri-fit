import { Icon, IconName } from "@/components/ui/icon";

interface CategoryBadgeProps {
  icon: IconName;
  label: string;
  gradient: string;
  onClick?: () => void;
}

export const CategoryBadge = ({ icon, label, gradient, onClick }: CategoryBadgeProps) => {
  return (
    <button
      onClick={onClick}
      className="group p-[16px] rounded-[var(--organic-radius)] transition-md-standard hover:scale-105 glass-card hover:shadow-md ripple-effect"
    >
      <div className="mb-[8px] flex items-center justify-center transition-md-fast group-hover:scale-110">
        <div className="w-10 h-10 rounded-full glass-icon-circle flex items-center justify-center">
          <Icon name={icon} size={20} className="text-md-secondary" />
        </div>
      </div>
      <div className="md-label-medium text-on-surface leading-tight">{label}</div>
    </button>
  );
};
