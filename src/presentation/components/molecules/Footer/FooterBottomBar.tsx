import { Heart } from "lucide-react";
import { legalLinks, brandInfo } from "@/shared/data/footerData";

export const FooterBottomBar = () => {
  return (
    <div className="border-t border-md-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-md-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-md-4">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-md-2">
            <p className="md-body-small text-md-on-surface-variant text-center md:text-left">
              &copy; {brandInfo.copyright}
            </p>
            <span className="hidden sm:inline text-md-on-surface-variant">•</span>
            <p className="md-body-small text-md-on-surface-variant flex items-center gap-1">
              Made with <Heart className="w-3 h-3 fill-md-error text-md-error inline animate-pulse" /> in Oran, Algeria
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-md-4 md:gap-md-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="md-body-small text-md-on-surface-variant hover:text-md-primary transition-colors duration-md-medium2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
