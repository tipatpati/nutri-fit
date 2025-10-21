import { HeroTestimonial } from "../../molecules/Hero/HeroTestimonial";
import { Icon } from "@/components/ui/icon";
export const HeroSocialProof = () => {
  const mealCategories = [{
    icon: "muscle",
    title: "Prise de masse",
    desc: "Repas riches en protéines",
    cal: "650-720 cal",
    color: "from-orange-500/20 to-red-500/20 border-orange-500/30"
  }, {
    icon: "running",
    title: "Minceur",
    desc: "Faibles calories, riches nutriments",
    cal: "350-420 cal",
    color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30"
  }, {
    icon: "scale-balance",
    title: "Équilibré",
    desc: "Parfait pour maintenir votre forme",
    cal: "520-580 cal",
    color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
  }] as const;
  return;
};