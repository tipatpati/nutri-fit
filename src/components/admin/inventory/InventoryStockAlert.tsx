import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface InventoryStockAlertProps {
  lowStockItems: Array<{
    name: string;
    current_stock: number;
    reorder_point: number;
    unit_of_measurement: string;
    primary_nutrient: string;
  }>;
}

const NUTRIENT_ICONS = {
  protein: '🥩',
  carbs: '🌾',
  vegetables: '🥗',
  fat: '🥑',
  condiment: '🧂',
};

const InventoryStockAlert = ({ lowStockItems }: InventoryStockAlertProps) => {
  if (lowStockItems.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <Package className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-900">Stock sain</AlertTitle>
        <AlertDescription className="text-green-700">
          Tous les ingrédients sont bien approvisionnés
        </AlertDescription>
      </Alert>
    );
  }

  const criticalItems = lowStockItems.filter(item => item.current_stock === 0);
  const lowItems = lowStockItems.filter(item => item.current_stock > 0 && item.current_stock <= item.reorder_point);

  return (
    <div className="space-y-4">
      {criticalItems.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Stock critique - {criticalItems.length} ingrédient(s)</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {criticalItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2">
                    <span>{NUTRIENT_ICONS[item.primary_nutrient as keyof typeof NUTRIENT_ICONS]}</span>
                    <span className="font-medium">{item.name}</span>
                  </span>
                  <Badge variant="destructive">Rupture de stock</Badge>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {lowItems.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-900">Stock faible - {lowItems.length} ingrédient(s)</AlertTitle>
          <AlertDescription className="text-orange-700">
            <div className="mt-2 space-y-2">
              {lowItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2">
                    <span>{NUTRIENT_ICONS[item.primary_nutrient as keyof typeof NUTRIENT_ICONS]}</span>
                    <span className="font-medium">{item.name}</span>
                  </span>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {item.current_stock} {item.unit_of_measurement} (seuil: {item.reorder_point})
                  </Badge>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InventoryStockAlert;
