import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterSocial } from "@/presentation/components/molecules/Footer/FooterSocial";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { NewsletterForm } from "@/presentation/components/molecules/Footer/NewsletterForm";
import { footerSections, legalLinks, brandInfo } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
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
            <p className="text-sm text-gray-400 text-center md:text-left">
              &copy; {brandInfo.copyright}
            </p>
            <div className="flex gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
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
