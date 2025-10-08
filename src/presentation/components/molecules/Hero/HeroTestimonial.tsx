interface HeroTestimonialProps {
  initial: string;
  name: string;
  role: string;
  quote: string;
  gradient?: string;
}

export const HeroTestimonial = ({ 
  initial, 
  name, 
  role, 
  quote,
  gradient = "from-orange-500 to-amber-500" 
}: HeroTestimonialProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-300 italic mb-2 leading-relaxed">
            "{quote}"
          </p>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
