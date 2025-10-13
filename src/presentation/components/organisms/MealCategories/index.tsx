import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import dumbbellIcon from "@/assets/icons/dumbbell.svg";
import shakerBottleIcon from "@/assets/icons/shaker-bottle.svg";
import deliveryTruckIcon from "@/assets/icons/delivery-truck.svg";
const MealCategories = () => {
  const steps = [{
    number: '1',
    title: 'Choisissez votre programme',
    description: 'Sélectionnez l\'objectif qui correspond à vos besoins nutritionnels et fitness',
    icon: dumbbellIcon,
    bgColor: 'bg-[hsl(var(--md-sys-color-primary-container))]',
    numberColor: 'text-[hsl(var(--md-sys-color-primary))]'
  }, {
    number: '2',
    title: 'Choisissez votre pack',
    description: 'Configurez votre formule idéale selon vos préférences et votre rythme',
    icon: shakerBottleIcon,
    bgColor: 'bg-[hsl(var(--md-sys-color-secondary-container))]',
    numberColor: 'text-[hsl(var(--md-sys-color-secondary))]'
  }, {
    number: '3',
    title: 'Choisissez la date de livraison',
    description: 'Recevez vos repas préparés directement à votre porte aux dates qui vous conviennent',
    icon: deliveryTruckIcon,
    bgColor: 'bg-[hsl(var(--md-sys-color-tertiary-container))]',
    numberColor: 'text-[hsl(var(--md-sys-color-tertiary))]'
  }];
  return <section className="py-20 lg:py-32 bg-[hsl(var(--md-sys-color-surface))]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="md-display-large text-on-surface mb-6">
            Comment ça fonctionne ?
          </h2>
          <p className="md-body-large text-on-surface-variant max-w-2xl mx-auto text-neutral-500">
            Économisez du temps et profitez de repas prêts-à-manger nutritifs en 3 étapes faciles
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => <div key={step.number} className="relative group animate-fade-in" style={{
          animationDelay: `${index * 150}ms`
        }}>
              {/* Large Step Number Background */}
              <div className={`absolute -top-4 -left-2 text-[120px] lg:text-[140px] font-bold ${step.numberColor} opacity-[0.08] leading-none pointer-events-none transition-opacity group-hover:opacity-[0.12]`}>
                {step.number}
              </div>
              
              {/* Content Card */}
              <div className="relative pt-8 h-full">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${step.bgColor} mb-6 transition-all duration-300 group-hover:scale-110 md-elevation-2 group-hover:md-elevation-4`}>
                  <img src={step.icon} alt={step.title} className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                {/* Text Content */}
                <h3 className="md-headline-medium text-on-surface mb-4">
                  {step.title}
                </h3>
                
                <p className="md-body-medium text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (desktop only) */}
              {index < steps.length - 1 && <div className={`hidden md:block absolute top-24 -right-6 lg:-right-10 ${step.numberColor} opacity-20 transition-opacity group-hover:opacity-40`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>}
            </div>)}
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fade-in" style={{
        animationDelay: '450ms'
      }}>
          <Link to="/menu">
            <Button size="lg" variant="filled" className="px-10 py-6 md-label-large md-elevation-2 hover:md-elevation-4 transition-all duration-300 hover:scale-105">
              Commencer
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default MealCategories;