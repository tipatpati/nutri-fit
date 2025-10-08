import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CategoryCTA = () => {
  return (
    <div className="text-center mt-md-12 lg:mt-md-16">
      <div className="bg-gradient-to-r from-md-primary to-md-tertiary rounded-md-2xl lg:rounded-md-3xl p-md-6 lg:p-md-8 text-md-on-primary md-elevation-3 max-w-4xl mx-auto">
        <h3 className="md-headline-medium mb-md-3 lg:mb-md-4">
          Prêt à transformer votre alimentation ?
        </h3>
        <p className="text-md-primary-container mb-md-4 lg:mb-md-6 md-body-large">
          Rejoignez plus de 10 000 clients satisfaits
        </p>
        <Link to="/menu">
          <Button 
            size="lg" 
            className="bg-md-surface text-md-primary hover:bg-md-surface-container-high font-bold px-md-6 lg:px-md-8 py-md-3 rounded-md-lg md-elevation-2"
          >
            Commencer mon parcours
            <ArrowRight className="ml-md-2 w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
