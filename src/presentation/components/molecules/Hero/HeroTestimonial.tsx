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
  gradient = "from-md-primary to-md-secondary" 
}: HeroTestimonialProps) => {
  return (
    <div className="md-surface-container-low/10 backdrop-blur rounded-xl lg:rounded-[16px] p-md-4 lg:p-md-6 border border-md-outline-variant/20">
      <div className="flex items-start space-x-md-3 lg:space-x-md-4">
        <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center font-bold text-white md-label-large md-elevation-1 flex-shrink-0`}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="md-body-small text-md-surface-on-variant italic mb-md-2 lg:mb-md-3 leading-relaxed">
            "{quote}"
          </p>
          <div>
            <p className="md-label-medium text-md-surface-on-surface">{name}</p>
            <p className="md-label-small text-md-surface-on-variant">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
