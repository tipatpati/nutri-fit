import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema } from "@/shared/validation/newsletterSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Gift, Users } from "lucide-react";

export const FooterNewsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt nos meilleures offres.",
      });
      reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative border-t border-[#FBF8EF]/10 bg-[#2B3210]/50 backdrop-blur-xl py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#FBF8EF] mb-2">
              Restez informé
            </h3>
            <p className="text-[#FBF8EF]/70">
              Recevez nos dernières offres et conseils nutrition
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              type="email"
              placeholder="Votre email"
              {...register("email")}
              className="glass-dark border-[#FBF8EF]/20 text-[#FBF8EF] placeholder:text-[#FBF8EF]/50"
            />
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? "..." : "S'inscrire"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
