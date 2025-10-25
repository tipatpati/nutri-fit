/**
 * Example Usage of NutritionGoalCard Component
 *
 * This file demonstrates how to integrate the NutritionGoalCard component
 * into your Forfaits or Order pages.
 */

import { useState } from "react";
import { NutritionGoalCard } from "./nutrition-goal-card";

export function NutritionGoalCardExample() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>("balanced");

  // Example nutrition goals data
  const nutritionGoals = [
    {
      id: "weight_loss",
      title: "Minceur",
      description: "Perdre du poids sainement avec des repas équilibrés et savoureux, riches en nutriments essentiels.",
      calorieRange: "300-450 cal",
      staticBg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
      animatedBg: "https://media.giphy.com/media/3o7TKnO6Wve6502iJ2/giphy.gif", // Healthy salad/vegetables
      goalType: "weight_loss" as const,
      isPopular: false,
    },
    {
      id: "balanced",
      title: "Équilibré",
      description: "Maintenez une alimentation équilibrée avec des repas variés qui soutiennent votre mode de vie actif.",
      calorieRange: "450-600 cal",
      staticBg: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop",
      animatedBg: "https://media.giphy.com/media/l0HlFZ3c4NENSLQRi/giphy.gif", // Balanced meal prep
      goalType: "balanced" as const,
      isPopular: true, // Most popular option
    },
    {
      id: "muscle_gain",
      title: "Prise de masse",
      description: "Développez votre masse musculaire avec des repas riches en protéines et calories contrôlées.",
      calorieRange: "650-800 cal",
      staticBg: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
      animatedBg: "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif", // Protein-rich food
      goalType: "muscle_gain" as const,
      isPopular: false,
    },
  ];

  return (
    <div className="container mx-auto px-md-4 py-md-12">
      {/* Section Header */}
      <div className="text-center mb-md-12">
        <div className="inline-flex items-center px-md-4 py-md-2 bg-md-primary-container text-md-on-primary-container rounded-md-full md-label-medium mb-md-4">
          <span className="w-2 h-2 bg-md-primary rounded-full mr-2"></span>
          Choisissez votre objectif
        </div>
        <h2 className="md-display-medium text-md-on-surface mb-md-4">
          Votre parcours santé commence ici
        </h2>
        <p className="md-body-large text-md-on-surface-variant max-w-3xl mx-auto">
          Sélectionnez l'objectif qui correspond le mieux à vos besoins nutritionnels
        </p>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md-6 max-w-7xl mx-auto">
        {nutritionGoals.map((goal, index) => (
          <NutritionGoalCard
            key={goal.id}
            id={goal.id}
            title={goal.title}
            description={goal.description}
            calorieRange={goal.calorieRange}
            staticBg={goal.staticBg}
            animatedBg={goal.animatedBg}
            goalType={goal.goalType}
            isSelected={selectedGoal === goal.id}
            isPopular={goal.isPopular}
            onSelect={() => setSelectedGoal(goal.id)}
            index={index}
          />
        ))}
      </div>

      {/* Selected Goal Info (Optional) */}
      {selectedGoal && (
        <div className="mt-md-12 text-center">
          <div className="glass-card p-md-6 rounded-md-3xl max-w-2xl mx-auto">
            <p className="md-body-large text-md-on-surface">
              Objectif sélectionné:{" "}
              <span className="font-semibold text-md-secondary">
                {nutritionGoals.find((g) => g.id === selectedGoal)?.title}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NutritionGoalCardExample;
