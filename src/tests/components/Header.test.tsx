import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/Header';

// Mock the auth hook
vi.mock('@/hooks/useAuth', () => ({
  default: () => ({
    user: null,
    signOut: vi.fn(),
  }),
}));

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('should render the header', () => {
    renderWithRouter(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should display the NutriFit logo/brand name', () => {
    renderWithRouter(<Header />);
    
    // Look for the brand name - it might be in a link or heading
    const brandElement = screen.getByText(/nutrifit/i);
    expect(brandElement).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithRouter(<Header />);
    
    // Check for common navigation links
    const menuLink = screen.queryByText(/menu/i);
    const forfaitsLink = screen.queryByText(/forfaits/i);
    
    // At least one should exist
    expect(menuLink || forfaitsLink).toBeTruthy();
  });

  it('should be accessible', () => {
    renderWithRouter(<Header />);
    
    // Header should have proper landmark role
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
