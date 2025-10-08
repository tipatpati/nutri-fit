import { describe, it, expect } from 'vitest';
import { RecipeCalculator, RecipeIngredient } from '@/utils/recipeCalculator';

describe('Recipe Calculator Utilities', () => {
  describe('generateRecipeVariants', () => {
    it('should generate variants for all categories', () => {
      const baseIngredients: Omit<RecipeIngredient, 'quantity'>[] = [
        { key: 'poulet', name: 'Poulet', type: 'protein', priority: 1 },
        { key: 'riz_basmati', name: 'Riz basmati', type: 'carbs', priority: 2 },
        { key: 'brocoli', name: 'Brocoli', type: 'vegetables', priority: 3 },
      ];

      const instructions = [
        'Cuire le poulet',
        'Préparer le riz',
        'Cuire les légumes à la vapeur',
      ];

      const variants = RecipeCalculator.generateRecipeVariants(baseIngredients, instructions);

      expect(variants).toHaveLength(3); // equilibre, perte_poids, prise_masse
      expect(variants[0]).toHaveProperty('category');
      expect(variants[0]).toHaveProperty('ingredients');
      expect(variants[0]).toHaveProperty('nutrition');
    });

    it('should include nutrition data for each variant', () => {
      const baseIngredients: Omit<RecipeIngredient, 'quantity'>[] = [
        { key: 'poulet', name: 'Poulet', type: 'protein', priority: 1 },
      ];

      const variants = RecipeCalculator.generateRecipeVariants(baseIngredients, ['Cook']);

      variants.forEach(variant => {
        expect(variant.nutrition).toHaveProperty('calories');
        expect(variant.nutrition).toHaveProperty('protein');
        expect(variant.nutrition).toHaveProperty('carbs');
        expect(variant.nutrition).toHaveProperty('fat');
      });
    });
  });

  describe('calculateForTarget', () => {
    it('should calculate quantities for target nutrition', () => {
      const ingredients: Omit<RecipeIngredient, 'quantity'>[] = [
        { key: 'poulet', name: 'Poulet', type: 'protein', priority: 1 },
        { key: 'riz_basmati', name: 'Riz', type: 'carbs', priority: 2 },
      ];

      const target = {
        calories: 500,
        protein: 40,
        carbs: 50,
        fat: 15,
      };

      const result = RecipeCalculator.calculateForTarget(ingredients, target);

      expect(result.length).toBeGreaterThan(0);
      result.forEach(ingredient => {
        expect(ingredient.quantity).toBeGreaterThan(0);
      });
    });

    it('should respect priority ordering', () => {
      const ingredients: Omit<RecipeIngredient, 'quantity'>[] = [
        { key: 'poulet', name: 'Poulet', type: 'protein', priority: 1 },
        { key: 'boeuf', name: 'Boeuf', type: 'protein', priority: 2 },
      ];

      const target = {
        calories: 500,
        protein: 40,
        carbs: 50,
        fat: 15,
      };

      const result = RecipeCalculator.calculateForTarget(ingredients, target);

      // Higher priority (lower number) should have more quantity
      const poulet = result.find(ing => ing.key === 'poulet');
      const boeuf = result.find(ing => ing.key === 'boeuf');

      if (poulet && boeuf) {
        expect(poulet.quantity).toBeGreaterThanOrEqual(boeuf.quantity);
      }
    });
  });

  describe('validateRecipe', () => {
    it('should validate a balanced recipe', () => {
      const recipe = {
        category: 'Équilibré',
        ingredients: [
          { key: 'poulet', name: 'Poulet', type: 'protein' as const, quantity: 150, priority: 1 },
          { key: 'riz_basmati', name: 'Riz', type: 'carbs' as const, quantity: 100, priority: 2 },
          { key: 'brocoli', name: 'Brocoli', type: 'vegetables' as const, quantity: 150, priority: 3 },
        ],
        nutrition: {
          calories: 500,
          protein: 45,
          carbs: 55,
          fat: 10,
          fiber: 8,
          sugar: 5,
          sodium: 300,
        },
        cookingInstructions: ['Cook everything'],
        portionSize: 400,
        preparationTime: 30,
        difficulty: 'medium' as const,
      };

      const validation = RecipeCalculator.validateRecipe(recipe);

      expect(validation).toHaveProperty('valid');
      expect(validation).toHaveProperty('issues');
      expect(validation).toHaveProperty('suggestions');
    });

    it('should detect missing protein', () => {
      const recipe = {
        category: 'Équilibré',
        ingredients: [
          { key: 'riz_basmati', name: 'Riz', type: 'carbs' as const, quantity: 100, priority: 1 },
        ],
        nutrition: {
          calories: 360,
          protein: 7,
          carbs: 80,
          fat: 0.5,
          fiber: 2,
          sugar: 1,
          sodium: 10,
        },
        cookingInstructions: ['Cook rice'],
        portionSize: 100,
        preparationTime: 20,
        difficulty: 'easy' as const,
      };

      const validation = RecipeCalculator.validateRecipe(recipe);

      expect(validation.issues.some(issue => issue.includes('protéines'))).toBe(true);
    });
  });

  describe('generateShoppingList', () => {
    it('should aggregate ingredients across recipes', () => {
      const recipes = [
        {
          category: 'Équilibré',
          ingredients: [
            { key: 'poulet', name: 'Poulet', type: 'protein' as const, quantity: 150, priority: 1 },
            { key: 'riz_basmati', name: 'Riz', type: 'carbs' as const, quantity: 100, priority: 2 },
          ],
          nutrition: { calories: 500, protein: 45, carbs: 55, fat: 10, fiber: 8, sugar: 5, sodium: 300 },
          cookingInstructions: [],
          portionSize: 250,
          preparationTime: 30,
          difficulty: 'medium' as const,
        },
        {
          category: 'Prise de masse',
          ingredients: [
            { key: 'poulet', name: 'Poulet', type: 'protein' as const, quantity: 200, priority: 1 },
          ],
          nutrition: { calories: 400, protein: 50, carbs: 0, fat: 8, fiber: 0, sugar: 0, sodium: 250 },
          cookingInstructions: [],
          portionSize: 200,
          preparationTime: 25,
          difficulty: 'easy' as const,
        },
      ];

      const shoppingList = RecipeCalculator.generateShoppingList(recipes, 1);

      expect(shoppingList.length).toBeGreaterThan(0);
      
      const poulet = shoppingList.find(item => item.ingredient.toLowerCase().includes('poulet'));
      expect(poulet).toBeDefined();
      if (poulet) {
        expect(poulet.totalQuantity).toBe(350); // 150 + 200
      }
    });

    it('should scale shopping list by servings', () => {
      const recipes = [{
        category: 'Équilibré',
        ingredients: [
          { key: 'poulet', name: 'Poulet', type: 'protein' as const, quantity: 100, priority: 1 },
        ],
        nutrition: { calories: 250, protein: 30, carbs: 0, fat: 5, fiber: 0, sugar: 0, sodium: 200 },
        cookingInstructions: [],
        portionSize: 100,
        preparationTime: 20,
        difficulty: 'easy' as const,
      }];

      const shoppingList = RecipeCalculator.generateShoppingList(recipes, 3);

      const poulet = shoppingList.find(item => item.ingredient.toLowerCase().includes('poulet'));
      expect(poulet?.totalQuantity).toBe(300); // 100 * 3
    });
  });
});
