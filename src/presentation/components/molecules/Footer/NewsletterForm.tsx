import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { newsletterSchema, type NewsletterFormData } from "@/shared/validation";

export const NewsletterForm = () => {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    // TODO: Add newsletter subscription logic
    toast.success("Merci de vous être abonné à notre newsletter !");
    form.reset();
  };

  return (
    <div className="border-t border-md-outline bg-gradient-to-r from-md-surface-container to-md-surface-container-low">
      <div className="container mx-auto px-md-4 sm:px-md-6 lg:px-md-8 py-md-8">
        <div className="grid md:grid-cols-2 gap-md-8 items-center">
          <div>
            <h4 className="md-title-large text-md-on-surface mb-md-2">Restez informé</h4>
            <p className="md-body-medium text-md-on-surface-variant">
              Recevez nos dernières offres et conseils nutrition
            </p>
          </div>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-md-3">
              <input
                type="email"
                {...form.register("email")}
                placeholder="Votre adresse email"
                className="flex-1 px-md-4 py-md-3 rounded-md-lg bg-md-surface-container border border-md-outline text-md-on-surface placeholder-md-on-surface-variant focus:outline-none focus:ring-2 focus:ring-md-primary focus:border-transparent backdrop-blur"
              />
              <Button 
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-gradient-to-r from-md-primary to-md-tertiary text-md-on-primary px-md-6 py-md-3 rounded-md-lg font-semibold hover:opacity-90 transition-all duration-md-medium2 hover:scale-105 md-elevation-2"
              >
                {form.formState.isSubmitting ? "Envoi..." : "S'abonner"}
              </Button>
            </form>
            {form.formState.errors.email && (
              <p className="text-md-error md-label-small mt-md-2">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
