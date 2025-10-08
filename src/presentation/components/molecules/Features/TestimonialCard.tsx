import { Star } from "lucide-react";
import { Testimonial } from "@/shared/data/features";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-md-surface-container-high/10 backdrop-blur-xl border border-md-outline/20 rounded-md-2xl p-md-8 hover:bg-md-surface-container-high/15 transition-all duration-md-medium2">
      <div className="flex items-center mb-md-4">
        <div className="flex text-md-tertiary text-lg mr-md-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="text-md-on-surface font-semibold md-title-medium">
          {testimonial.rating}/5
        </span>
      </div>
      
      <p className="md-body-large mb-md-6 leading-relaxed text-md-on-surface">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center space-x-md-4">
        <div className="w-14 h-14 bg-gradient-to-br from-md-primary to-md-tertiary rounded-full flex items-center justify-center font-bold text-xl md-elevation-2 text-md-on-primary">
          {testimonial.initial}
        </div>
        <div>
          <p className="font-bold md-title-medium text-md-on-surface">{testimonial.author}</p>
          <p className="text-md-on-surface-variant md-body-medium">
            {testimonial.role} • {testimonial.tenure}
          </p>
        </div>
      </div>
    </div>
  );
};
