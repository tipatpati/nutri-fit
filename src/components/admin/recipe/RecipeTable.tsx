import { ChefHat, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Meal } from "./types";
import { useState } from "react";
import { AnimatedEdit, AnimatedTrash } from "@/components/ui/animated-icon";

interface RecipeTableProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

const RecipeTable = ({ meals, onEdit, onDelete }: RecipeTableProps) => {
  const [sortField, setSortField] = useState<keyof Meal | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prise de masse": return "text-md-error";
      case "Minceur": return "text-md-primary";
      case "Équilibré": return "text-md-tertiary";
      default: return "text-emerald-800";
    }
  };

  const handleSort = (field: keyof Meal) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Meal) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-emerald-800" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 ml-1 text-md-primary" />
      : <ArrowDown className="w-4 h-4 ml-1 text-md-primary" />;
  };

  const sortedMeals = [...meals].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      const comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    }
    
    return 0;
  });

  if (meals.length === 0) {
    return (
      <div className="text-center py-md-8">
        <ChefHat className="mx-auto h-12 w-12 text-emerald-800" />
        <p className="mt-md-2 md-body-medium text-md-surface-on-surface">Aucune recette disponible</p>
        <p className="md-body-small text-emerald-800">Cliquez sur "Ajouter une recette" pour commencer</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">
              <button 
                className="flex items-center hover:bg-md-surface-variant/20 p-md-1 rounded-md-xs transition-colors duration-md-short4"
                onClick={() => handleSort('name')}
              >
                Recette
                {getSortIcon('name')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center hover:bg-md-surface-variant/20 p-md-1 rounded-md-xs transition-colors duration-md-short4"
                onClick={() => handleSort('meat')}
              >
                Viandes
                {getSortIcon('meat')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center hover:bg-md-surface-variant/20 p-md-1 rounded-md-xs transition-colors duration-md-short4"
                onClick={() => handleSort('vegetables')}
              >
                Légumes
                {getSortIcon('vegetables')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center hover:bg-md-surface-variant/20 p-md-1 rounded-md-xs transition-colors duration-md-short4"
                onClick={() => handleSort('carbs')}
              >
                Glucides
                {getSortIcon('carbs')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center hover:bg-md-surface-variant/20 p-md-1 rounded-md-xs transition-colors duration-md-short4"
                onClick={() => handleSort('category')}
              >
                Catégorie
                {getSortIcon('category')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center hover:bg-md-surface-variant/20 p-md-1 rounded-md-xs transition-colors duration-md-short4"
                onClick={() => handleSort('premium')}
              >
                Premium
                {getSortIcon('premium')}
              </button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMeals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>
                <div>
                  <div className="md-body-large text-md-surface-on-surface">{meal.name}</div>
                  <div className="md-body-small text-emerald-800 line-clamp-2 mt-md-1">{meal.description}</div>
                  {meal.badge && (
                    <span className="inline-flex items-center px-md-2 py-md-1 rounded-md-full md-label-small bg-md-tertiary-container text-md-tertiary-container-on mt-md-1">
                      {meal.badge}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{meal.meat}</TableCell>
              <TableCell>{meal.vegetables}</TableCell>
              <TableCell>{meal.carbs}</TableCell>
              <TableCell>
                <span className={`md-label-large ${getCategoryColor(meal.category)}`}>
                  {meal.category}
                </span>
              </TableCell>
              <TableCell>
                {meal.premium ? (
                  <span className="inline-flex items-center px-md-2 py-md-1 rounded-md-full md-label-small bg-md-secondary-container text-md-secondary-container-on">
                    Premium
                  </span>
                ) : (
                  <span className="md-body-medium text-emerald-800">Standard</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-md-2">
                  <Button 
                    size="sm" 
                    variant="text"
                    onClick={() => onEdit(meal)}
                    className="md-state-layer"
                  >
                    <AnimatedEdit size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="text"
                    onClick={() => onDelete(meal.id)}
                    className="text-md-error hover:text-md-error md-state-layer"
                  >
                    <AnimatedTrash size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeTable;