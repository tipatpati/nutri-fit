import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  Calendar,
  X,
  Grid3x3,
  List,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MenuHeaderProps {
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  totalMeals?: number;
}

const MenuHeader = ({ 
  selectedWeek, 
  setSelectedWeek,
  onSearch,
  onFilterChange,
  viewMode = 'grid',
  onViewModeChange,
  totalMeals = 15
}: MenuHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filterCategories = [
    { id: 'vegetarian', label: 'Végétarien', icon: '🥗' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Sans gluten', icon: '🌾' },
    { id: 'dairy-free', label: 'Sans lactose', icon: '🥛' },
    { id: 'premium', label: 'Premium', icon: '⭐' },
    { id: 'high-protein', label: 'Riche en protéines', icon: '💪' },
  ];

  const handleFilterToggle = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    onFilterChange?.([]);
    onSearch?.("");
  };

  return (
    <div className="space-y-8 mb-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full border-2 border-[#DE6E27]/20 mb-6"
        >
          <Calendar className="w-5 h-5 text-[#DE6E27]" />
          <span className="font-bold text-[#2B3210]">Menu Hebdomadaire</span>
        </motion.div>
        
        <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold text-[#2B3210] mb-4">
          Menu de la semaine
        </h1>
        <p className="text-xl text-[#505631] mb-6 max-w-2xl mx-auto leading-relaxed">
          Découvrez <span className="font-bold text-[#DE6E27]">{totalMeals} nouveaux repas</span> prêts-à-manger cette semaine
        </p>

        {/* Week Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <span className="text-lg font-semibold text-[#2B3210]">Semaine du</span>
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="glass-strong border-2 border-[#E5E2D9] rounded-xl px-6 py-3 text-[#2B3210] font-semibold hover:border-[#DE6E27] focus:border-[#DE6E27] focus:outline-none focus:ring-4 focus:ring-[#DE6E27]/20 transition-all duration-300 cursor-pointer"
          >
            <option value="8 juin 2025">8 juin 2025</option>
            <option value="15 juin 2025">15 juin 2025</option>
            <option value="22 juin 2025">22 juin 2025</option>
          </select>
        </motion.div>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-2xl p-4 border-2 border-[#E5E2D9] shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#505631]" />
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Rechercher un repas..."
              className="glass border-2 border-[#E5E2D9] pl-12 pr-10 py-6 text-lg rounded-xl focus:border-[#DE6E27] transition-all duration-300"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 glass rounded-full flex items-center justify-center hover:bg-[#DE6E27]/10"
              >
                <X className="w-4 h-4 text-[#505631]" />
              </motion.button>
            )}
          </div>

          {/* Filter Button */}
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass border-2 border-[#E5E2D9] px-6 py-3 rounded-xl font-semibold text-[#2B3210] hover:border-[#DE6E27] hover:bg-[#DE6E27]/5 transition-all duration-300 flex items-center gap-2 relative"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtres
                {activeFilters.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                  >
                    {activeFilters.length}
                  </motion.div>
                )}
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="glass-strong w-80 p-6 border-2 border-[#DE6E27]/30 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210]">
                    Filtres
                  </h3>
                  {activeFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-[#DE6E27] hover:bg-[#DE6E27]/10"
                    >
                      Tout effacer
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {filterCategories.map((filter) => (
                    <motion.button
                      key={filter.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterToggle(filter.id)}
                      className={`w-full glass rounded-xl p-4 flex items-center justify-between border-2 transition-all duration-300 ${
                        activeFilters.includes(filter.id)
                          ? 'border-[#DE6E27] bg-[#DE6E27]/10'
                          : 'border-transparent hover:border-[#E5E2D9]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{filter.icon}</span>
                        <span className="font-semibold text-[#2B3210]">{filter.label}</span>
                      </span>
                      {activeFilters.includes(filter.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-gradient-to-r from-[#DE6E27] to-[#ff8040] rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-xs">✓</span>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* View Mode Toggle */}
          {onViewModeChange && (
            <div className="flex gap-2 glass border-2 border-[#E5E2D9] rounded-xl p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewModeChange('grid')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-lg'
                    : 'text-[#505631] hover:bg-[#E5E2D9]'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewModeChange('list')}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white shadow-lg'
                    : 'text-[#505631] hover:bg-[#E5E2D9]'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#E5E2D9]"
            >
              {activeFilters.map((filterId) => {
                const filter = filterCategories.find(f => f.id === filterId);
                return (
                  <motion.div
                    key={filterId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    layout
                  >
                    <Badge
                      className="glass-strong border-2 border-[#DE6E27] text-[#2B3210] px-4 py-2 text-sm font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#DE6E27] hover:text-white transition-all duration-300"
                      onClick={() => handleFilterToggle(filterId)}
                    >
                      <span>{filter?.icon}</span>
                      <span>{filter?.label}</span>
                      <X className="w-4 h-4" />
                    </Badge>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-lg text-[#505631]">
          <motion.span
            key={totalMeals}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-['Space_Grotesk'] text-2xl font-bold text-[#DE6E27]"
          >
            {totalMeals}
          </motion.span>
          {' '}repas disponibles
        </p>
      </motion.div>
    </div>
  );
};

export default MenuHeader;
