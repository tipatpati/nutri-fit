import { Facebook, Instagram, Twitter } from "lucide-react";
import { socialLinks } from "@/shared/data/footerData";

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter
};

const colorMap = {
  facebook: 'from-[#1877F2] to-[#0d5fc9]',
  instagram: 'from-[#E4405F] to-[#C13584]',
  twitter: 'from-[#1DA1F2] to-[#0d8bd9]'
};

export const FooterSocial = () => {
  return (
    <div className="flex space-x-md-4">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.platform];
        const gradient = colorMap[link.platform];
        
        return (
          <a
            key={link.platform}
            href={link.href}
            aria-label={link.ariaLabel}
            className={`group w-12 h-12 bg-gradient-to-br ${gradient} hover:opacity-90 rounded-md-lg flex items-center justify-center transition-all duration-md-medium2 hover:scale-110 md-elevation-2`}
          >
            <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </a>
        );
      })}
    </div>
  );
};
