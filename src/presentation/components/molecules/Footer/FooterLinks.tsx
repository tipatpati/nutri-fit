import { FooterSection } from "@/shared/data/footerData";

interface FooterLinksProps {
  section: FooterSection;
}

export const FooterLinks = ({ section }: FooterLinksProps) => {
  return (
    <div className="space-y-md-6">
      <h4 className="md-title-large text-md-on-surface">{section.title}</h4>
      <ul className="space-y-md-3">
        {section.links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="md-body-medium text-md-on-surface-variant hover:text-md-primary transition-colors duration-md-medium2 hover:translate-x-1 transform inline-block"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
