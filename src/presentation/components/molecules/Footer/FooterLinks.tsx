import { FooterSection } from "@/shared/data/footerData";
import { ChevronRight } from "lucide-react";

interface FooterLinksProps {
  section: FooterSection;
}

export const FooterLinks = ({ section }: FooterLinksProps) => {
  return (
    <div className="space-y-md-6">
      <h4 className="md-title-large text-white font-semibold">{section.title}</h4>
      <ul className="space-y-md-3">
        {section.links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="group md-body-medium text-white/80 hover:text-md-tertiary transition-all duration-md-medium2 flex items-center gap-md-2"
            >
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-md-medium2 -ml-6 group-hover:ml-0" />
              <span className="group-hover:translate-x-1 transition-transform duration-md-medium2">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
