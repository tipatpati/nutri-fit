import { FooterBrand } from "@/presentation/components/molecules/Footer/FooterBrand";
import { FooterLinks } from "@/presentation/components/molecules/Footer/FooterLinks";
import { FooterContact } from "@/presentation/components/molecules/Footer/FooterContact";
import { FooterNewsletter } from "@/presentation/components/molecules/Footer/FooterNewsletter";
import { FooterDecorator } from "@/presentation/components/molecules/Footer/FooterDecorator";
import { FooterBottomBar } from "@/presentation/components/molecules/Footer/FooterBottomBar";
import { footerSections } from "@/shared/data/footerData";

const Footer = () => {
  return (
    <footer className="relative bg-md-primary text-md-on-primary">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-md-8 lg:py-md-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-md-6 lg:gap-md-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <FooterBrand />
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <FooterLinks key={index} section={section} />
          ))}

          {/* Contact Section */}
          <FooterContact />
        </div>
      </div>

      {/* Newsletter - Compact inline */}
      <FooterNewsletter />

      {/* Bottom Footer */}
      <FooterBottomBar />
    </footer>
  );
};

export default Footer;
