
import { Button } from "@/components/ui/button";

interface MenuHeaderProps {
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
}

const MenuHeader = ({ selectedWeek, setSelectedWeek }: MenuHeaderProps) => {
  return (
    <div className="text-center mb-12 lg:mb-16">
      <div className="inline-block mb-6">
        <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-400/10 rounded-full px-6 py-2 border border-emerald-200/50">
          <span className="text-emerald-700 text-sm font-medium">Menu Hebdomadaire</span>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-800 to-slate-700 bg-clip-text text-transparent leading-tight">
        Menu de la semaine
      </h1>
      <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Découvrez 15 nouveaux repas prêts-à-manger<br className="hidden sm:block" />
        chaque semaine et personnalisez-les à votre goût !
      </p>
      
      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8">
        {["Repas prêts-à-manger", "Formule familiale", "Collations", "Épicerie"].map((filter, index) => (
          <Button key={index} variant="outline" className="rounded-full text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 border-2 border-emerald-200/60 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 backdrop-blur-sm bg-white/80">
            {filter}
          </Button>
        ))}
      </div>

      {/* Week Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-12 lg:mb-16">
        <span className="text-slate-600 text-base lg:text-lg font-medium">Semaine du</span>
        <select 
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="border-2 border-emerald-200/60 rounded-xl px-4 py-3 text-base lg:text-lg bg-white/80 backdrop-blur-sm hover:border-emerald-300 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
        >
          <option value="8 juin 2025">8 juin 2025</option>
          <option value="15 juin 2025">15 juin 2025</option>
          <option value="22 juin 2025">22 juin 2025</option>
        </select>
        <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-base lg:text-lg px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
          Commander
        </Button>
      </div>
    </div>
  );
};

export default MenuHeader;
