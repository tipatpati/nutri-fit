import { Check, ChevronsUpDown } from "lucide-react";
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
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher un ingrédient..." />
          <CommandEmpty>Aucun ingrédient trouvé.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {filteredIngredients.map((ingredient) => (
              <CommandItem
                key={ingredient.id}
                value={ingredient.name}
                onSelect={() => {
                  onSelect(ingredient.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedId === ingredient.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="flex items-center gap-2 flex-1">
                  <span>{NUTRIENT_ICONS[ingredient.primary_nutrient]}</span>
                  <span>{ingredient.name}</span>
                  <Badge 
                    variant={ingredient.current_stock > 0 ? "secondary" : "destructive"} 
                    className="ml-auto text-xs"
                  >
                    {ingredient.current_stock} {ingredient.unit_of_measurement}
                  </Badge>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IngredientSelector;
