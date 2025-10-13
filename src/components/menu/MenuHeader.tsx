
import { Button } from "@/components/ui/button";

interface MenuHeaderProps {
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
}

const MenuHeader = ({ selectedWeek, setSelectedWeek }: MenuHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
      <div className="inline-block mb-4 sm:mb-6">
        <div className="bg-[hsl(var(--md-sys-color-primary-container))] rounded-[var(--md-sys-shape-corner-full)] px-4 sm:px-6 py-2 border border-[hsl(var(--md-sys-color-outline-variant))]">
          <span className="md-label-medium text-[hsl(var(--md-sys-color-on-primary-container))] font-semibold">Menu Hebdomadaire</span>
        </div>
      </div>
      
      <h1 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))] mb-4 sm:mb-6 leading-tight px-2">
        Menu de la semaine
      </h1>
      <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
        Découvrez 15 nouveaux repas prêts-à-manger<br className="hidden sm:block" />
        chaque semaine et personnalisez-les à votre goût !
      </p>
      
      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 px-2">
        {["Repas prêts-à-manger", "Formule familiale", "Collations", "Épicerie"].map((filter, index) => (
          <Button key={index} variant="outlined" className="md-label-large rounded-[var(--md-sys-shape-corner-full)] px-3 sm:px-4 lg:px-6 py-2 lg:py-3">
            {filter}
          </Button>
        ))}
      </div>

      {/* Week Selector */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16 px-2">
        <span className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">Semaine du</span>
        <select 
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="md-body-large text-[hsl(var(--md-sys-color-on-surface))] border-2 border-[hsl(var(--md-sys-color-outline))] rounded-[var(--md-sys-shape-corner-large)] px-3 sm:px-4 py-2 sm:py-3 bg-[hsl(var(--md-sys-color-surface))] hover:border-[hsl(var(--md-sys-color-primary))] focus:border-[hsl(var(--md-sys-color-primary))] focus:outline-none focus:ring-4 focus:ring-[hsl(var(--md-sys-color-primary))]/20 transition-all duration-300 w-full sm:w-auto max-w-xs mx-auto"
        >
          <option value="8 juin 2025">8 juin 2025</option>
          <option value="15 juin 2025">15 juin 2025</option>
          <option value="22 juin 2025">22 juin 2025</option>
        </select>
        <Button variant="filled" size="lg" className="w-full sm:w-auto">
          Commander
        </Button>
      </div>
    </div>
  );
};

export default MenuHeader;
