import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '@/components/Footer';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  it('should render the footer', () => {
    renderWithRouter(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should display brand name', () => {
    renderWithRouter(<Footer />);
    
    const brandName = screen.getByText(/nutrifit/i);
    expect(brandName).toBeInTheDocument();
  });

  it('should display contact information', () => {
    renderWithRouter(<Footer />);
    
    // Check for email
    const email = screen.getByText(/info@nutrifit\.dz/i);
    expect(email).toBeInTheDocument();
  });

  it('should have newsletter subscription form', () => {
    renderWithRouter(<Footer />);
    
    const emailInput = screen.getByPlaceholderText(/adresse email/i);
    expect(emailInput).toBeInTheDocument();
    
    const subscribeButton = screen.getByRole('button', { name: /s'abonner/i });
    expect(subscribeButton).toBeInTheDocument();
  });

  it('should display social media links', () => {
    renderWithRouter(<Footer />);
    
    // Check for social media links by aria-label
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('aria-label')?.toLowerCase().includes('suivez')
    );
    
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('should display copyright information', () => {
    renderWithRouter(<Footer />);
    
    const copyright = screen.getByText(/2024 nutrifit/i);
    expect(copyright).toBeInTheDocument();
  });

  it('should display legal links', () => {
    renderWithRouter(<Footer />);
    
    const privacyLink = screen.getByText(/politique de confidentialité/i);
    const termsLink = screen.getByText(/conditions d'utilisation/i);
    
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });

  it('should be accessible', () => {
    renderWithRouter(<Footer />);
    
    // Footer should have proper contentinfo role
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
