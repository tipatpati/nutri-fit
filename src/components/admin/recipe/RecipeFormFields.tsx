import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RecipeFormData } from "./types";

interface RecipeFormFieldsProps {
  formData: RecipeFormData;
  setFormData: (data: RecipeFormData) => void;
}

const RecipeFormFields = ({ formData, setFormData }: RecipeFormFieldsProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de la recette</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Chicken Boost - Riz Énergie"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Équilibré">Équilibré</SelectItem>
              <SelectItem value="Perte de poids">Perte de poids</SelectItem>
              <SelectItem value="Prise de masse">Prise de masse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description complète du plat"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="meat">Viandes/Protéines</Label>
          <Input
            id="meat"
            value={formData.meat}
            onChange={(e) => setFormData({ ...formData, meat: e.target.value })}
            placeholder="Ex: Blanc de poulet grillé"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vegetables">Légumes</Label>
          <Input
            id="vegetables"
            value={formData.vegetables}
            onChange={(e) => setFormData({ ...formData, vegetables: e.target.value })}
            placeholder="Ex: Légumes vapeur"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="carbs">Glucides</Label>
          <Input
            id="carbs"
            value={formData.carbs}
            onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
            placeholder="Ex: Riz basmati"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="badge">Badge (optionnel)</Label>
          <Input
            id="badge"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            placeholder="Ex: Repas protéiné"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">URL de l'image</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="premium"
          checked={formData.premium}
          onCheckedChange={(checked) => setFormData({ ...formData, premium: checked })}
        />
        <Label htmlFor="premium">Recette premium</Label>
      </div>
    </div>
  );
};

export default RecipeFormFields;