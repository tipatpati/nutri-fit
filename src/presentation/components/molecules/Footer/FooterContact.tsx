import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/shared/data/footerData";

const iconMap = {
  mail: Mail,
  phone: Phone,
  map: MapPin
};

export const FooterContact = () => {
  return (
    <div className="space-y-md-6">
      <h4 className="md-title-large text-md-on-surface">Nous contacter</h4>
      <div className="space-y-md-4">
        {contactInfo.map((contact, index) => {
          const Icon = iconMap[contact.icon];
          return (
            <div key={index} className="flex items-center space-x-md-3 text-md-on-surface-variant">
              <Icon className="w-5 h-5 text-md-primary" />
              <span className="md-body-medium">{contact.value}</span>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-md-3">
        <Button className="w-full bg-md-surface-container text-md-on-surface px-md-6 py-md-3 rounded-md-lg font-semibold hover:bg-md-surface-container-high transition-all duration-md-medium2 hover:scale-105 md-elevation-1">
          Nous joindre
        </Button>
        <Button className="w-full bg-md-primary text-md-primary-on-container px-md-6 py-md-3 rounded-md-lg font-semibold hover:bg-md-primary/90 transition-all duration-md-medium2 hover:scale-105 md-elevation-2">
          Voir la FAQ
        </Button>
      </div>
    </div>
  );
};
