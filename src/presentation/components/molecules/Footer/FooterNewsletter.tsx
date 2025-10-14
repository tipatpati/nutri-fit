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
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-md-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center justify-between gap-md-4">
          <div className="flex items-center gap-md-3">
            <Mail className="w-5 h-5 text-md-tertiary flex-shrink-0" />
            <div>
              <p className="md-body-medium text-white font-medium">Newsletter</p>
              <p className="md-body-small text-white/70">Recevez nos meilleures offres</p>
            </div>
          </div>

          <div className="flex gap-md-2 w-full md:w-auto md:min-w-96">
            <Input
              type="email"
              placeholder="Votre email"
              {...register("email")}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 h-10"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-md-tertiary text-md-on-tertiary hover:bg-md-tertiary/90 h-10 px-md-6 whitespace-nowrap"
            >
              {isSubmitting ? "..." : "S'abonner"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
