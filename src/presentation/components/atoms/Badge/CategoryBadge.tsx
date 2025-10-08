interface CategoryBadgeProps {
  emoji: string;
  label: string;
  gradient: string;
  onClick?: () => void;
}

export const CategoryBadge = ({ emoji, label, gradient, onClick }: CategoryBadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={`group p-md-3 lg:p-md-4 bg-gradient-to-br ${gradient} border border-current/30 rounded-xl lg:rounded-[16px] hover:shadow-md transition-all duration-300 transform hover:scale-105`}
    >
      <div className="text-2xl lg:text-3xl mb-md-1 lg:mb-md-2 group-hover:scale-110 transition-transform">
        {emoji}
      </div>
      <div className="md-label-small text-white">{label}</div>
    </button>
  );
};
