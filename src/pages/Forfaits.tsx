import NutriFitNavbar from "@/components/NutriFitNavbar";
import Footer from "@/components/Footer";
import Packs from "@/components/Packs";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Clock, ChefHat, Leaf, Star, Heart, Zap, Shield } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { NutritionGoalCard } from "@/components/ui/nutrition-goal-card";
import { Button } from "@/components/ui/button";
import priseMasseIcon from "@/assets/icons/prise-masse-icon.png";
import equilibreIcon from "@/assets/icons/equilibre-icon.png";
import minceurIcon from "@/assets/icons/minceur-icon.png";
import minceurBackground from "@/assets/minceur-background.jpg";
import slimBodyIcon from "@/assets/icons/slim-body.png";
import yogaIcon from "@/assets/icons/yoga.png";
import armMuscleIcon from "@/assets/icons/arm-muscle.png";

const Forfaits = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const features = [
    {
      icon: Truck,
      title: "Frais, jamais congelé",
      description: "Livraison fraîche directement chez vous",
      gradient: "from-md-primary to-md-secondary"
    },
    {
      icon: Leaf,
      title: "Ingrédients sains",
      description: "Produits de qualité et biologiques",
      gradient: "from-[hsl(var(--color-success))] to-[hsl(var(--color-success-light))]"
    },
    {
      icon: Clock,
      title: "Prêt en 2 minutes",
      description: "Réchauffez et savourez rapidement",
      gradient: "from-md-secondary to-[hsl(var(--md-sys-color-secondary-light))]"
    },
    {
      icon: ChefHat,
      title: "Pas de préparation ni de cuisine",
      description: "Tout est prêt, plus qu'à déguster",
      gradient: "from-md-tertiary to-[hsl(var(--md-sys-color-tertiary-container))]"
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--md-sys-color-surface))] overflow-x-hidden">
      <NutriFitNavbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(var(--md-sys-color-surface-dim))] via-[hsl(var(--md-sys-color-surface))] to-[hsl(var(--md-sys-color-surface-dim))] py-12 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-[hsl(var(--md-sys-color-secondary))] to-[hsl(var(--md-sys-color-tertiary))] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[hsl(var(--md-sys-color-primary-container))] border border-[hsl(var(--md-sys-color-outline-variant))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium text-[hsl(var(--md-sys-color-on-primary-container))] mb-6 sm:mb-8">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[hsl(var(--md-sys-color-tertiary))] flex-shrink-0" />
            Forfaits Premium NutriFit
          </div>
          
          <h1 className="md-display-large text-[hsl(var(--md-sys-color-on-surface))] mb-6 sm:mb-8 leading-tight px-2">
            <span>Découvrez nos</span>
            <br />
            <span className="bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] bg-clip-text text-transparent">
              forfaits santé
            </span>
          </h1>
          
          <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
            Commandez de 6 à 30 repas livrés directement à votre porte.
            <span className="block mt-2 text-[hsl(var(--md-sys-color-primary))] md-title-medium">
              Nutrition premium • Saveurs authentiques • Qualité garantie
            </span>
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-[hsl(var(--md-sys-color-on-surface-variant))] px-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--md-sys-color-primary))] flex-shrink-0" />
              <span className="md-label-large">Qualité certifiée</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--md-sys-color-error))] flex-shrink-0" />
              <span className="md-label-large">10K+ clients satisfaits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(var(--md-sys-color-tertiary))] flex-shrink-0" />
              <span className="md-label-large">Livraison express</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Enhanced Meal Size Selection */}
          <div className="max-w-4xl mx-auto mb-14 lg:mb-16">
            <div className="text-center mb-8 lg:mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-[hsl(var(--md-sys-color-primary-container))] text-[hsl(var(--md-sys-color-on-primary-container))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium mb-4">
                <span className="w-2 h-2 bg-[hsl(var(--md-sys-color-primary))] rounded-full mr-2"></span>
                Étape 1
              </div>
              <h2 className="md-headline-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
                Manger santé, c'est facile
              </h2>
              <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-3xl mx-auto leading-relaxed">
                Avec nos repas fraîchement préparés à portée de main, manger santé n'aura jamais été aussi savoureux !
              </p>
            </div>

            {/* Enhanced Fitness Goals Selector with NutritionGoalCard */}
            <div>
              <div className="text-center mb-8 lg:mb-10">
                <h2 className="md-headline-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
                  Choisissez Votre Objectif Nutritionnel
                </h2>
                <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-2xl mx-auto">
                  Sélectionnez l'objectif qui correspond le mieux à vos besoins.
                  Nos plans sont conçus par des nutritionnistes professionnels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
                {[
                  {
                    id: "weight_loss",
                    title: "Minceur",
                    description: "Perdez du poids sainement avec nos repas équilibrés et contrôlés en calories",
                    calorieRange: "1200-1500 kcal/jour",
                    goalType: "weight_loss" as const,
                    staticBg: minceurBackground,
                    animatedBg: minceurBackground,
                    icon: slimBodyIcon,
                    isPopular: true,
                  },
                  {
                    id: "balanced",
                    title: "Équilibre Nutritionnel",
                    description: "Maintenez un équilibre parfait entre protéines, glucides et lipides pour votre bien-être",
                    calorieRange: "1600-2000 kcal/jour",
                    goalType: "balanced" as const,
                    staticBg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
                    animatedBg: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&auto=format&fit=crop",
                    icon: yogaIcon,
                  },
                  {
                    id: "muscle_gain",
                    title: "Prise de Masse",
                    description: "Développez votre masse musculaire avec des repas riches en protéines et nutriments essentiels",
                    calorieRange: "2200-2800 kcal/jour",
                    goalType: "muscle_gain" as const,
                    staticBg: "https://images.unsplash.com/photo-1532384816664-01b8b7238c8d?w=800&auto=format&fit=crop",
                    animatedBg: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop",
                    icon: armMuscleIcon,
                  },
                ].map((goal, index) => (
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
                    onSelect={() => setSelectedGoal(goal.id)}
                    index={index}
                    isPopular={goal.isPopular}
                    icon={goal.icon}
                  />
                ))}
              </div>

              {selectedGoal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-[hsl(var(--md-sys-color-surface-container))] rounded-[var(--md-sys-shape-corner-extra-large)] border border-[hsl(var(--md-sys-color-outline-variant))] max-w-2xl mx-auto text-center"
                >
                  <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
                    Excellent choix ! Objectif sélectionné : <strong>{
                      [
                        { id: "weight_loss", title: "Minceur" },
                        { id: "balanced", title: "Équilibre Nutritionnel" },
                        { id: "muscle_gain", title: "Prise de Masse" },
                      ].find(g => g.id === selectedGoal)?.title
                    }</strong>
                  </p>
                  <Button
                    className="bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] text-white px-8 py-3 rounded-[var(--md-sys-shape-corner-full)] hover:scale-105 transition-transform"
                    onClick={() => {
                      console.log("Proceeding with goal:", selectedGoal);
                    }}
                  >
                    Continuer avec cet objectif
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced Package Selection */}
          <Packs />

          {/* Enhanced Features Section */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 lg:mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-[hsl(var(--md-sys-color-tertiary-container))] text-[hsl(var(--md-sys-color-on-tertiary-container))] rounded-[var(--md-sys-shape-corner-full)] md-label-medium mb-4">
                <span className="w-2 h-2 bg-[hsl(var(--md-sys-color-tertiary))] rounded-full mr-2"></span>
                Pourquoi nous choisir
              </div>
              <h3 className="md-headline-large text-[hsl(var(--md-sys-color-on-surface))] mb-4">
                Le choix de prêt-à-manger numéro 1 au pays
              </h3>
              <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))] max-w-3xl mx-auto">
                Une expérience culinaire exceptionnelle qui transforme votre quotidien
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group text-center space-y-4 p-5 lg:p-6 glass-card rounded-[var(--md-sys-shape-corner-extra-large)] md-elevation-1 hover:md-elevation-3 hover:scale-105 transition-all duration-md-long1">
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br ${feature.gradient} rounded-[var(--md-sys-shape-corner-large)] flex items-center justify-center md-elevation-1 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h4 className="md-title-medium text-[hsl(var(--md-sys-color-on-surface))] group-hover:text-[hsl(var(--md-sys-color-primary))] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="md-body-medium text-[hsl(var(--md-sys-color-on-surface-variant))] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Forfaits;
