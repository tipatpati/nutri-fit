import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }
    
    // TODO: Add newsletter subscription logic
    toast.success("Merci de vous être abonné à notre newsletter !");
    setEmail("");
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
          <form onSubmit={handleSubmit} className="flex space-x-md-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 px-md-4 py-md-3 rounded-md-lg bg-md-surface-container border border-md-outline text-md-on-surface placeholder-md-on-surface-variant focus:outline-none focus:ring-2 focus:ring-md-primary focus:border-transparent backdrop-blur"
            />
            <Button 
              type="submit"
              className="bg-gradient-to-r from-md-primary to-md-tertiary text-md-on-primary px-md-6 py-md-3 rounded-md-lg font-semibold hover:opacity-90 transition-all duration-md-medium2 hover:scale-105 md-elevation-2"
            >
              S'abonner
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
