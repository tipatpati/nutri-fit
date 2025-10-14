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
    <div className="flex gap-md-2">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.platform];
        const gradient = colorMap[link.platform];
        
        return (
          <a
            key={link.platform}
            href={link.href}
            aria-label={link.ariaLabel}
            className={`w-8 h-8 bg-gradient-to-br ${gradient} hover:opacity-80 rounded-md flex items-center justify-center transition-opacity duration-md-medium2`}
          >
            <Icon className="w-4 h-4 text-white" />
          </a>
        );
      })}
    </div>
  );
};
