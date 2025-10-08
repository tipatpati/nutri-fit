import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '@/components/Footer';

// Helper functions
const getByRole = (container: HTMLElement, role: string) => 
  container.querySelector(`[role="${role}"]`) as HTMLElement;
const getByText = (container: HTMLElement, text: RegExp | string) => {
  const elements = Array.from(container.querySelectorAll('*'));
  return elements.find(el => {
    const content = el.textContent || '';
    return typeof text === 'string' ? content.includes(text) : text.test(content);
  }) as HTMLElement;
};
const getByPlaceholder = (container: HTMLElement, text: RegExp | string) => {
  return container.querySelector(`[placeholder*="${typeof text === 'string' ? text : ''}"]`) as HTMLElement;
};
const getAllByRole = (container: HTMLElement, role: string) => 
  Array.from(container.querySelectorAll(`[role="${role}"]`)) as HTMLElement[];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  it('should render the footer', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const footer = getByRole(container, 'contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should display brand name', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const brandName = getByText(container, /nutrifit/i);
    expect(brandName).toBeInTheDocument();
  });

  it('should display contact information', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const email = getByText(container, /info@nutrifit\.dz/i);
    expect(email).toBeInTheDocument();
  });

  it('should have newsletter subscription form', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const emailInput = getByPlaceholder(container, 'adresse email');
    expect(emailInput).toBeInTheDocument();
    
    const buttons = getAllByRole(container, 'button');
    const subscribeButton = buttons.find(btn => btn.textContent?.includes('abonner'));
    expect(subscribeButton).toBeTruthy();
  });

  it('should display social media links', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const links = getAllByRole(container, 'link');
    const socialLinks = links.filter(link => 
      link.getAttribute('aria-label')?.toLowerCase().includes('suivez')
    );
    
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('should display copyright information', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const copyright = getByText(container, /2024 nutrifit/i);
    expect(copyright).toBeInTheDocument();
  });

  it('should display legal links', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const privacyLink = getByText(container, /politique de confidentialité/i);
    const termsLink = getByText(container, /conditions d'utilisation/i);
    
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });

  it('should be accessible', () => {
    const { container } = renderWithRouter(<Footer />);
    
    const footer = getByRole(container, 'contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
