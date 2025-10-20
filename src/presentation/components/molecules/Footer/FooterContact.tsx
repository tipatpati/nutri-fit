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
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-[#FBF8EF] uppercase tracking-wide font-['Space_Grotesk']">Contact</h4>
      <div className="space-y-3">
        {contactInfo.map((contact, index) => {
          const Icon = iconMap[contact.icon];
          return (
            <div key={index} className="flex items-center gap-3 text-[#FBF8EF]/70">
              <Icon className="w-5 h-5 text-[#DE6E27] flex-shrink-0" />
              <span className="text-sm font-['DM_Sans']">{contact.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
