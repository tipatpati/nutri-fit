import { FooterSection } from "@/shared/data/footerData";
import { ChevronRight } from "lucide-react";

interface FooterLinksProps {
  section: FooterSection;
}

export const FooterLinks = ({ section }: FooterLinksProps) => {
  return (
    <div className="space-y-md-3">
      <h4 className="md-label-large text-white font-semibold uppercase tracking-wide">{section.title}</h4>
      <ul className="space-y-md-2">
        {section.links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="md-body-small text-white/70 hover:text-white transition-colors duration-md-medium2"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
