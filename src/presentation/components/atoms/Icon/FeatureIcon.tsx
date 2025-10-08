interface FeatureIconProps {
  icon: string;
  className?: string;
}

export const FeatureIcon = ({ icon, className = '' }: FeatureIconProps) => {
  return (
    <div className={`w-20 h-20 mx-auto bg-gradient-to-br from-md-primary to-md-primary-container rounded-md-xl flex items-center justify-center text-3xl md-elevation-2 group-hover:scale-110 transition-transform duration-md-medium2 ${className}`}>
      {icon}
    </div>
  );
};
