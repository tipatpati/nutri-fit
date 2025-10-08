import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterSocial } from "@/presentation/components/molecules/Footer/FooterSocial";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { NewsletterForm } from "@/presentation/components/molecules/Footer/NewsletterForm";
import { footerSections, legalLinks, brandInfo } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-md-4 sm:px-md-6 lg:px-md-8 py-md-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-md-12">
          {/* Brand Section */}
          <div>
            <FooterBrand />
            <div className="mt-md-6">
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
      <div className="border-t border-md-outline bg-slate-900">
        <div className="container mx-auto px-md-4 sm:px-md-6 lg:px-md-8 py-md-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-md-4 md:space-y-0">
            <p className="text-md-on-surface-variant md-body-medium text-center md:text-left">
              &copy; {brandInfo.copyright}
            </p>
            <div className="flex space-x-md-6 md-body-small">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-md-on-surface-variant hover:text-md-primary transition-colors"
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
