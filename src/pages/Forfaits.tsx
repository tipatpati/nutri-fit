import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Packs from "@/components/Packs";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Clock, ChefHat, Leaf, Star, Heart, Zap, Shield } from "lucide-react";
import { useState } from "react";

const Forfaits = () => {
  const [selectedGoal, setSelectedGoal] = useState("balanced");

  const features = [
    {
      icon: Truck,
      title: "Frais, jamais congelé",
      description: "Livraison fraîche directement chez vous",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Leaf,
      title: "Ingrédients sains",
      description: "Produits de qualité et biologiques",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Clock,
      title: "Prêt en 2 minutes",
      description: "Réchauffez et savourez rapidement",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: ChefHat,
      title: "Pas de préparation ni de cuisine",
      description: "Tout est prêt, plus qu'à déguster",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--md-sys-color-surface))] overflow-x-hidden">
      <Header />
      
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

            {/* Enhanced Fitness Goals Selector */}
            <div className="glass-card rounded-[var(--md-sys-shape-corner-extra-large)] p-6 lg:p-10 md-elevation-2">
              <h3 className="md-title-large text-[hsl(var(--md-sys-color-on-surface))] text-center mb-6 lg:mb-8">
                Choisissez votre objectif fitness
              </h3>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-12">
                {[
                  { goal: "weight_loss", label: "Perte de poids", mealSize: "300-450 cal", bgClass: "from-blue-400 to-blue-500", icon: "running" as const },
                  { goal: "balanced", label: "Équilibre", mealSize: "450-600 cal", bgClass: "from-emerald-400 to-green-500", popular: true, icon: "scale-balance" as const },
                  { goal: "muscle_gain", label: "Prise de masse", mealSize: "650-800 cal", bgClass: "from-purple-400 to-pink-500", icon: "muscle" as const }
                ].map((item) => (
                  <div 
                    key={item.goal}
                    className={`group cursor-pointer p-4 sm:p-6 lg:p-8 rounded-[var(--md-sys-shape-corner-large)] border-2 transition-all duration-300 hover:scale-105 relative w-full sm:w-auto ${
                      selectedGoal === item.goal ? "border-[hsl(var(--md-sys-color-primary))] bg-[hsl(var(--md-sys-color-primary-container))] md-elevation-2" : "border-[hsl(var(--md-sys-color-outline-variant))] hover:border-[hsl(var(--md-sys-color-outline))]"
                    }`}
                    onClick={() => setSelectedGoal(item.goal)}
                  >
                    {item.popular && (
                      <Badge className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[hsl(var(--md-sys-color-primary))] to-[hsl(var(--md-sys-color-secondary))] text-white md-label-small px-3 sm:px-4 py-1">
                        Le plus populaire !
                      </Badge>
                    )}
                    <div className={`w-16 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-20 bg-gradient-to-br ${item.bgClass} rounded-[var(--md-sys-shape-corner-medium)] mb-3 sm:mb-4 group-hover:scale-110 transition-transform mx-auto flex items-center justify-center`}>
                      <Icon name={item.icon} size={40} className="brightness-0 invert" />
                    </div>
                    <p className="text-center md-title-medium text-[hsl(var(--md-sys-color-on-surface))]">{item.label}</p>
                    <p className="text-center md-body-small text-[hsl(var(--md-sys-color-on-surface-variant))] mt-1">Repas de {item.mealSize}</p>
                  </div>
                ))}
              </div>
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
