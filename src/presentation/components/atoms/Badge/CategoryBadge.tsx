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
      className={`group p-4 bg-gradient-to-br ${gradient} border border-white/20 rounded-xl hover:border-white/30 transition-all duration-200 hover:scale-105`}
    >
      <div className="mb-2 flex items-center justify-center transition-transform group-hover:scale-110">
        <Icon name={icon} size={24} className="brightness-0 invert" />
      </div>
      <div className="text-xs font-medium text-white leading-tight">{label}</div>
    </button>
  );
};
