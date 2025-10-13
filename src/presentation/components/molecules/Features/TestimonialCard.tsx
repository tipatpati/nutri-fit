import { Star } from "lucide-react";
import { Testimonial } from "@/shared/data/features";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-[hsl(var(--md-sys-color-surface-container-high))]/10 backdrop-blur-xl border border-[hsl(var(--md-sys-color-outline))]/20 rounded-[var(--md-sys-shape-corner-extra-large)] p-8 hover:bg-[hsl(var(--md-sys-color-surface-container-high))]/15 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="flex text-[hsl(var(--md-sys-color-tertiary))] text-lg mr-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="font-semibold md-title-medium text-on-surface">
          {testimonial.rating}/5
        </span>
      </div>
      
      <p className="md-body-large text-on-surface mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-tertiary))] rounded-full flex items-center justify-center font-bold text-xl md-elevation-2 text-white">
          {testimonial.initial}
        </div>
        <div>
          <p className="font-bold md-title-medium text-on-surface">{testimonial.author}</p>
          <p className="md-body-medium text-on-surface-variant">
            {testimonial.role} • {testimonial.tenure}
          </p>
        </div>
      </div>
    </div>
  );
};
