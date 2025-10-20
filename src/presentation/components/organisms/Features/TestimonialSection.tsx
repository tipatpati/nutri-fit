import { Star } from "lucide-react";
import { testimonial, stats } from "@/shared/data/features";
import { TestimonialCard } from "@/presentation/components/molecules/Features/TestimonialCard";

export const TestimonialSection = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[var(--md-sys-shape-corner-extra-large)] p-8 md:p-12 lg:p-16 text-white md-elevation-4 overflow-hidden relative mt-12 md:mt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-tertiary))] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-[hsl(var(--md-sys-color-tertiary))] to-[hsl(var(--md-sys-color-secondary))] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div className="space-y-6 md:space-y-8">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              Ce que nos clients disent de nous
            </h3>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Découvrez pourquoi plus de 10 000 personnes nous font confiance chaque jour
            </p>
          </div>
          
          <TestimonialCard testimonial={testimonial} />
        </div>
        
        <div className="text-center space-y-6 md:space-y-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[var(--md-sys-shape-corner-extra-large)] p-6 md:p-8 lg:p-10">
            <div className="text-6xl font-bold bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-tertiary))] bg-clip-text text-transparent mb-4">
              {stats.overall.rating}/5
            </div>
            <div className="flex justify-center text-[hsl(var(--md-sys-color-tertiary))] text-2xl mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-current" />
              ))}
            </div>
            <p className="md-title-large mb-2">Excellent</p>
            <p className="text-white/70 md-body-medium">
              Basé sur {stats.overall.reviews} avis clients vérifiés
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
            {stats.metrics.map((metric, index) => {
              const colors = ['text-[hsl(var(--md-sys-color-primary))]', 'text-[hsl(var(--md-sys-color-tertiary))]', 'text-[hsl(var(--md-sys-color-secondary))]'];
              return (
                <div key={index} className="bg-white/5 backdrop-blur rounded-[var(--md-sys-shape-corner-large)] p-4 md:p-5">
                  <div className={`md-headline-small ${colors[index]} mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-white/70 md-label-small">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
