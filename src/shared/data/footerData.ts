export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  icon: 'mail' | 'phone' | 'map';
  label: string;
  value: string;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter';
  href: string;
  ariaLabel: string;
}

export const footerSections: FooterSection[] = [
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Presse', href: '#' },
      { label: 'Partenaires', href: '#' }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Forfaits', href: '/forfaits' },
      { label: 'Menu', href: '/menu' },
      { label: 'Recommandations', href: '#' },
      { label: 'Entreprise', href: '#' },
      { label: 'Nutrition coaching', href: '#' }
    ]
  }
];

export const contactInfo: ContactInfo[] = [
  { icon: 'mail', label: 'Email', value: 'info@nutrifit.dz' },
  { icon: 'phone', label: 'Téléphone', value: '+213 123 456 789' },
  { icon: 'map', label: 'Adresse', value: 'Oran, Algérie' }
];

export const socialLinks: SocialLink[] = [
  { platform: 'facebook', href: '#', ariaLabel: 'Suivez-nous sur Facebook' },
  { platform: 'instagram', href: '#', ariaLabel: 'Suivez-nous sur Instagram' },
  { platform: 'twitter', href: '#', ariaLabel: 'Suivez-nous sur Twitter' }
];

export const legalLinks: FooterLink[] = [
  { label: 'Politique de confidentialité', href: '#' },
  { label: 'Conditions d\'utilisation', href: '#' },
  { label: 'Cookies', href: '#' }
];

export const brandInfo = {
  name: 'NutriFit',
  description: 'Des repas sains et équilibrés pour atteindre vos objectifs de fitness. Nutrition de qualité, préparée avec passion.',
  copyright: '2024 NutriFit. Tous droits réservés.'
};
