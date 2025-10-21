import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Ingredient } from "@/hooks/useIngredients";

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selectedId: string | null;
  onSelect: (ingredientId: string) => void;
  placeholder?: string;
  nutrientFilter?: 'protein' | 'carbs' | 'vegetables' | 'fat' | 'condiment';
}

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
  fat: '🥑',
  condiment: '🧂',
};

const NUTRIENT_LABELS = {
  protein: 'Protéine',
  carbs: 'Glucides',
  vegetables: 'Légumes',
  fat: 'Lipides',
  condiment: 'Condiment',
};

const IngredientSelector = ({ 
  ingredients, 
  selectedId, 
  onSelect, 
  placeholder = "Sélectionner un ingrédient...",
  nutrientFilter 
}: IngredientSelectorProps) => {
  const [open, setOpen] = useState(false);

  const filteredIngredients = nutrientFilter
    ? ingredients.filter(ing => ing.primary_nutrient === nutrientFilter)
    : ingredients;

  const selectedIngredient = ingredients.find(ing => ing.id === selectedId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedIngredient ? (
            <span className="flex items-center gap-2">
              <span>{NUTRIENT_ICONS[selectedIngredient.primary_nutrient]}</span>
              <span>{selectedIngredient.name}</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                {selectedIngredient.current_stock} {selectedIngredient.unit_of_measurement}
              </Badge>
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="glass-strong w-full p-0 border-2 border-[#DE6E27]/30 shadow-2xl">
        <Command className="rounded-xl">
          <CommandInput 
            placeholder="Rechercher un ingrédient..." 
            className="border-b border-[#E5E2D9]"
          />
          <CommandEmpty className="py-6 text-center">
            <div className="text-[#505631]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">Aucun ingrédient trouvé</p>
            </div>
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {filteredIngredients.map((ingredient) => {
              const isLowStock = ingredient.current_stock <= ingredient.reorder_point;
              const isOutOfStock = ingredient.current_stock === 0;
              
              return (
                <CommandItem
                  key={ingredient.id}
                  value={ingredient.name}
                  onSelect={() => {
                    onSelect(ingredient.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#DE6E27]/10 rounded-lg my-1 transition-all duration-200"
                >
                  <Check
                    className={cn(
                      "w-5 h-5 text-[#DE6E27]",
                      selectedId === ingredient.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-2xl">{NUTRIENT_ICONS[ingredient.primary_nutrient]}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-[#2B3210]">{ingredient.name}</p>
                    <p className="text-xs text-[#505631]">{ingredient.type}</p>
                  </div>
                  <Badge 
                    variant={isOutOfStock ? "destructive" : isLowStock ? "outline" : "secondary"}
                    className={cn(
                      "font-bold",
                      isLowStock && !isOutOfStock && "border-warning text-warning"
                    )}
                  >
                    {ingredient.current_stock} {ingredient.unit_of_measurement}
                  </Badge>
                  {isOutOfStock && (
                    <Badge variant="destructive" className="ml-2">
                      Rupture
                    </Badge>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IngredientSelector;
