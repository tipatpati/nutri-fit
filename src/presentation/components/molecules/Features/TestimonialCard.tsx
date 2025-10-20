import { Star } from "lucide-react";
import { Testimonial } from "@/shared/data/features";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="glass-dark rounded-2xl p-8 hover:scale-105 transition-all duration-500">
      <div className="flex items-center mb-4">
        <div className="flex text-orange-primary text-lg mr-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-lg text-cream">
          {testimonial.rating}/5
        </span>
      </div>
      
      <p className="text-base text-cream/90 mb-6 leading-relaxed italic">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-primary to-orange-light rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg">
          {testimonial.initial}
        </div>
        <div>
          <p className="font-bold text-lg text-cream">{testimonial.author}</p>
          <p className="text-sm text-cream/60">
            {testimonial.role} • {testimonial.tenure}
          </p>
        </div>
      </div>
    </div>
  );
};
