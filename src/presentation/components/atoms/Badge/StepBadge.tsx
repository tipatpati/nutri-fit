interface StepBadgeProps {
  step: string;
  className?: string;
}

export const StepBadge = ({ step, className = '' }: StepBadgeProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="text-4xl sm:text-6xl font-bold opacity-20 absolute -top-2 sm:-top-4 -right-2 sm:-right-4">
        {step}
      </div>
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{step}</div>
      </div>
    </div>
  );
};
