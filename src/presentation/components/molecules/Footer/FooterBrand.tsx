import { brandInfo } from "@/shared/data/footerData";

export const FooterBrand = () => {
  return (
    <div className="space-y-md-6">
      <div>
        <h3 className="md-headline-medium bg-gradient-to-r from-md-primary to-md-tertiary bg-clip-text text-transparent mb-md-3">
          {brandInfo.name}
        </h3>
        <p className="md-body-medium text-md-on-surface-variant leading-relaxed">
          {brandInfo.description}
        </p>
      </div>
    </div>
  );
};
