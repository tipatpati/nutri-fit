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
      <h4 className="md-title-large text-white font-semibold">Nous contacter</h4>
      <div className="space-y-md-4">
        {contactInfo.map((contact, index) => {
          const Icon = iconMap[contact.icon];
          return (
            <div key={index} className="flex items-center space-x-md-3 text-white/80">
              <Icon className="w-5 h-5 text-md-tertiary" />
              <span className="md-body-medium">{contact.value}</span>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-md-3">
        <Button className="w-full bg-white/10 text-white px-md-6 py-md-3 rounded-md-lg font-semibold hover:bg-white/20 transition-all duration-md-medium2 hover:scale-105 md-elevation-1 border border-white/20">
          Nous joindre
        </Button>
        <Button className="w-full bg-md-tertiary text-md-on-tertiary px-md-6 py-md-3 rounded-md-lg font-semibold hover:bg-md-tertiary/90 transition-all duration-md-medium2 hover:scale-105 md-elevation-2">
          Voir la FAQ
        </Button>
      </div>
    </div>
  );
};
