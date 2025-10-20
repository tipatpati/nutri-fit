
import { Button } from "@/components/ui/button";

interface MenuHeaderProps {
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
}

const MenuHeader = ({ selectedWeek, setSelectedWeek }: MenuHeaderProps) => {
  return (
    <div className="text-center max-w-4xl mx-auto px-4">
      <div className="inline-block mb-4 md:mb-6">
        <div className="bg-[hsl(var(--md-sys-color-primary-container))] rounded-[var(--md-sys-shape-corner-full)] px-4 md:px-6 py-2 border border-[hsl(var(--md-sys-color-outline-variant))]">
          <span className="text-xs md:text-sm font-semibold text-[hsl(var(--md-sys-color-on-primary-container))]">Menu Hebdomadaire</span>
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--md-sys-color-on-surface))] mb-4 md:mb-6 leading-tight">
        Menu de la semaine
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-[hsl(var(--md-sys-color-on-surface-variant))] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
        Découvrez 15 nouveaux repas prêts-à-manger<br className="hidden sm:block" />
        chaque semaine et personnalisez-les à votre goût !
      </p>
      
      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
        {["Repas prêts-à-manger", "Formule familiale", "Collations", "Épicerie"].map((filter, index) => (
          <Button key={index} variant="outlined" className="text-sm md:text-base rounded-[var(--md-sys-shape-corner-full)] px-3 md:px-4 lg:px-6 py-2 lg:py-3">
            {filter}
          </Button>
        ))}
      </div>

      {/* Week Selector */}
      <div className="flex flex-col gap-4 md:gap-6">
        <span className="text-lg md:text-xl font-semibold text-[hsl(var(--md-sys-color-on-surface))]">Semaine du</span>
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
