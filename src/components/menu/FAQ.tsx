
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const questions = [
    "Offrez-vous des options végétariennes?",
    "Est-ce que vos repas sont sans ?"
  ];

  return (
    <div className="text-center mb-8 sm:mb-16 lg:mb-20 px-2">
      <h2 className="md-headline-large text-[hsl(var(--md-sys-color-on-surface))] mb-6 sm:mb-8 lg:mb-12">
        Questions fréquemment posées
      </h2>
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-[hsl(var(--md-sys-color-surface-container))] border border-[hsl(var(--md-sys-color-outline-variant))] rounded-[var(--md-sys-shape-corner-large)] p-3 sm:p-4 lg:p-6 text-left md-elevation-1 hover:md-elevation-3 transition-all duration-300 hover:-translate-y-1">
            <button className="w-full flex justify-between items-center text-left md-title-medium text-[hsl(var(--md-sys-color-on-surface))] hover:text-[hsl(var(--md-sys-color-primary))] transition-colors duration-300">
              <span className="pr-2 leading-relaxed">{question}</span>
              <span className="text-xl sm:text-2xl text-[hsl(var(--md-sys-color-primary))] font-light flex-shrink-0">+</span>
            </button>
          </div>
        ))}
      </div>
      <Button 
        variant="outlined"
        size="lg" 
        className="mt-6 sm:mt-8 lg:mt-12 w-full sm:w-auto"
      >
        Voir la FAQ
      </Button>
    </div>
  );
};

export default FAQ;
