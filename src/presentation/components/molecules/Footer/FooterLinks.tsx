import { FooterSection } from "@/shared/data/footerData";
import { ChevronRight } from "lucide-react";

interface FooterLinksProps {
  section: FooterSection;
}

export const FooterLinks = ({ section }: FooterLinksProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-[#FBF8EF] uppercase tracking-wide font-['Space_Grotesk']">{section.title}</h4>
      <ul className="space-y-3">
        {section.links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-sm text-[#FBF8EF]/70 hover:text-[#DE6E27] transition-colors duration-300 font-['DM_Sans']"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
