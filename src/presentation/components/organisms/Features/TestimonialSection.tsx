import { Star } from "lucide-react";
import { testimonial, stats } from "@/shared/data/features";
import { TestimonialCard } from "@/presentation/components/molecules/Features/TestimonialCard";

export const TestimonialSection = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-md-3xl p-md-12 text-white md-elevation-4 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-md-primary to-md-tertiary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-md-tertiary to-md-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-md-12 items-center">
        <div className="space-y-md-8">
          <div>
            <h3 className="md-headline-large mb-md-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ce que nos clients disent de nous
            </h3>
            <p className="text-md-on-surface-variant md-body-large">
              Découvrez pourquoi plus de 10 000 personnes nous font confiance chaque jour
            </p>
          </div>
          
          <TestimonialCard testimonial={testimonial} />
        </div>
        
        <div className="text-center space-y-md-8">
          <div className="bg-md-surface-container-high/10 backdrop-blur-xl border border-md-outline/20 rounded-md-2xl p-md-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-md-primary to-md-tertiary bg-clip-text text-transparent mb-md-4">
              {stats.overall.rating}/5
            </div>
            <div className="flex justify-center text-md-tertiary text-2xl mb-md-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <p className="md-title-large mb-md-2">Excellent</p>
            <p className="text-md-on-surface-variant md-body-medium">
              Basé sur {stats.overall.reviews} avis clients vérifiés
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-md-4 text-center">
            {stats.metrics.map((metric, index) => {
              const colors = ['text-md-primary', 'text-md-tertiary', 'text-md-secondary'];
              return (
                <div key={index} className="bg-md-surface-container-high/10 backdrop-blur rounded-md-lg p-md-4">
                  <div className={`md-headline-small ${colors[index]} mb-md-1`}>
                    {metric.value}
                  </div>
                  <div className="text-md-on-surface-variant md-label-small">
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
