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
    <div className="space-y-md-3">
      <h4 className="md-label-large text-white font-semibold uppercase tracking-wide">Contact</h4>
      <div className="space-y-md-2">
        {contactInfo.map((contact, index) => {
          const Icon = iconMap[contact.icon];
          return (
            <div key={index} className="flex items-center gap-md-2 text-white/70">
              <Icon className="w-4 h-4 text-md-tertiary flex-shrink-0" />
              <span className="md-body-small">{contact.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
