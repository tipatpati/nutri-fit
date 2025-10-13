import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, Calendar, Package } from "lucide-react";

const MealCategories = () => {
  const steps = [
    { 
      number: '1', 
      title: 'Choisissez votre programme',
      description: 'Sélectionnez l\'objectif qui correspond à vos besoins nutritionnels et fitness',
      icon: ChefHat,
      color: 'text-primary'
    },
    { 
      number: '2', 
      title: 'Choisissez votre pack',
      description: 'Configurez votre formule idéale selon vos préférences et votre rythme',
      icon: Package,
      color: 'text-secondary'
    },
    { 
      number: '3', 
      title: 'Choisissez la date de livraison',
      description: 'Recevez vos repas préparés directement à votre porte aux dates qui vous conviennent',
      icon: Calendar,
      color: 'text-accent'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[hsl(var(--md-sys-color-surface-container))]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[hsl(var(--md-sys-color-on-surface))] mb-6">
            Comment ça fonctionne ?
          </h2>
          <p className="text-lg lg:text-xl text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-2xl">
            Économisez du temps et profitez de repas prêts-à-manger nutritifs en 3 étapes faciles
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Large Step Number */}
                <div className="absolute -top-4 -left-2 text-[120px] lg:text-[140px] font-bold text-[hsl(var(--md-sys-color-primary))] opacity-10 leading-none pointer-events-none">
                  {step.number}
                </div>
                
                {/* Content */}
                <div className="relative pt-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(var(--md-sys-color-primary-container))] mb-6`}>
                    <Icon className={`w-8 h-8 text-[hsl(var(--md-sys-color-on-primary-container))]`} />
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-[hsl(var(--md-sys-color-on-surface))] mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-[hsl(var(--md-sys-color-on-surface-variant))] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-6 lg:-right-8 text-[hsl(var(--md-sys-color-primary))] opacity-30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link to="/menu">
            <Button 
              size="lg" 
              variant="filled"
              className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Commencer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MealCategories;
