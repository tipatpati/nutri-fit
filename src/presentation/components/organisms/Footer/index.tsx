import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterSocial } from "@/presentation/components/molecules/Footer/FooterSocial";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { NewsletterForm } from "@/presentation/components/molecules/Footer/NewsletterForm";
import { footerSections, legalLinks, brandInfo } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--md-sys-color-surface-dim))] text-white">
      {/* Main Footer Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div>
            <FooterBrand />
            <div className="mt-6">
              <FooterSocial />
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <FooterLinks key={index} section={section} />
          ))}

          {/* Contact Section */}
          <FooterContact />
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterForm />

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="md-body-small text-white/70 text-center md:text-left">
              &copy; {brandInfo.copyright}
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="md-body-small text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
