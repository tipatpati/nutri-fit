import { useState } from "react";
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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-md-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-md-xl p-md-8 md:p-md-12 md-elevation-3 border border-white/20">
        <div className="grid md:grid-cols-2 gap-md-8 items-center">
          {/* Left: Content */}
          <div className="space-y-md-4">
            <div className="flex items-center gap-md-3">
              <div className="w-12 h-12 bg-md-tertiary rounded-md-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-md-on-tertiary" />
              </div>
              <div>
                <h3 className="md-headline-small text-white">
                  Newsletter NutriFit
                </h3>
                <p className="md-body-small text-white/80">
                  Rejoignez 2000+ abonnés
                </p>
              </div>
            </div>

            <p className="md-body-medium text-white/90 leading-relaxed">
              Recevez nos conseils nutrition, recettes exclusives et offres spéciales chaque semaine.
            </p>

            {/* Benefits */}
            <div className="space-y-md-2">
              <div className="flex items-center gap-md-2 text-white/90">
                <Gift className="w-4 h-4 text-md-tertiary" />
                <span className="md-body-small">-10% sur votre première commande</span>
              </div>
              <div className="flex items-center gap-md-2 text-white/90">
                <Users className="w-4 h-4 text-md-secondary" />
                <span className="md-body-small">Accès prioritaire aux nouveautés</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-md-4">
              <div>
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  {...register("email")}
                  className={`w-full bg-white/20 border-white/30 text-white placeholder:text-white/60 ${
                    errors.email ? 'border-md-error' : ''
                  }`}
                />
                {errors.email && (
                  <p className="md-body-small text-md-error mt-md-2">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-md-tertiary text-md-on-tertiary hover:bg-md-tertiary/90 py-md-6 rounded-md-lg font-semibold transition-all duration-md-medium2 hover:scale-105 md-elevation-2"
              >
                {isSubmitting ? "Inscription..." : "S'abonner gratuitement"}
              </Button>

              <p className="md-body-small text-white/70 text-center">
                🔒 Vos données sont protégées. Désinscription facile à tout moment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
