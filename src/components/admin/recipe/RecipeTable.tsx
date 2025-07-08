import { Edit, Trash2, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Meal } from "./types";

interface RecipeTableProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

const RecipeTable = ({ meals, onEdit, onDelete }: RecipeTableProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prise de masse": return "text-orange-600";
      case "Perte de poids": return "text-emerald-600";
      case "Équilibré": return "text-amber-600";
      default: return "text-slate-600";
    }
  };

  if (meals.length === 0) {
    return (
      <div className="text-center py-8">
        <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Aucune recette disponible</p>
        <p className="text-xs text-gray-500">Cliquez sur "Ajouter une recette" pour commencer</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Recette</TableHead>
            <TableHead>Viandes</TableHead>
            <TableHead>Légumes</TableHead>
            <TableHead>Glucides</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{meal.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{meal.description}</div>
                  {meal.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                      {meal.badge}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm">{meal.meat}</TableCell>
              <TableCell className="text-sm">{meal.vegetables}</TableCell>
              <TableCell className="text-sm">{meal.carbs}</TableCell>
              <TableCell>
                <span className={`text-sm font-medium ${getCategoryColor(meal.category)}`}>
                  {meal.category}
                </span>
              </TableCell>
              <TableCell>
                {meal.premium ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800">
                    Premium
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Standard</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(meal)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDelete(meal.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
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