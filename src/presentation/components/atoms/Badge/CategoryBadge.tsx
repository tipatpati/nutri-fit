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
      className={`group p-md-3 lg:p-md-4 bg-gradient-to-br ${gradient} border border-current/30 rounded-xl lg:rounded-[16px] hover:shadow-md transition-all duration-300 transform hover:scale-105`}
    >
      <div className="mb-md-1 lg:mb-md-2 group-hover:scale-110 transition-transform flex items-center justify-center">
        <Icon name={icon} size={32} className="lg:w-12 lg:h-12 brightness-0 invert" />
      </div>
      <div className="md-label-small text-white">{label}</div>
    </button>
  );
};
