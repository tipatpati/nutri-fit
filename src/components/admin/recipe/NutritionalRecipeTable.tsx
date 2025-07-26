import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Meal } from "./types";
import { NUTRITIONAL_CATEGORIES } from "@/constants/nutritionalCategories";

interface NutritionalRecipeTableProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: string, name: string) => void;
}

const NutritionalRecipeTable = ({ meals, onEdit, onDelete }: NutritionalRecipeTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Composition</TableHead>
            <TableHead>Variantes créées</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-emerald-800 py-8">
                Aucune recette trouvée
              </TableCell>
            </TableRow>
          ) : (
            meals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell>
                  {meal.image_url ? (
                    <img 
                      src={meal.image_url} 
                      alt={meal.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">N/A</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-emerald-800">{meal.name}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-emerald-800 truncate">{meal.description}</p>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-emerald-800">
                    <div><strong>Viande:</strong> {meal.meat}</div>
                    <div><strong>Légumes:</strong> {meal.vegetables}</div>
                    <div><strong>Glucides:</strong> {meal.carbs}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {NUTRITIONAL_CATEGORIES.map((category) => (
                      <Badge 
                        key={category.id} 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: category.color,
                          color: category.color
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {meal.premium ? (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-emerald-800 border-emerald-300">
                      Standard
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(meal)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(meal.id, meal.name)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NutritionalRecipeTable;