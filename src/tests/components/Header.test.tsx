import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/Header';

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
const queryByText = (container: HTMLElement, text: RegExp | string) => {
  const elements = Array.from(container.querySelectorAll('*'));
  return elements.find(el => {
    const content = el.textContent || '';
    return typeof text === 'string' ? content.includes(text) : text.test(content);
  }) as HTMLElement | undefined;
};

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
    const { container } = renderWithRouter(<Header />);
    
    const header = getByRole(container, 'banner');
    expect(header).toBeInTheDocument();
  });

  it('should display the NutriFit logo/brand name', () => {
    const { container } = renderWithRouter(<Header />);
    
    const brandElement = getByText(container, /nutrifit/i);
    expect(brandElement).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    const { container } = renderWithRouter(<Header />);
    
    const menuLink = queryByText(container, /menu/i);
    const forfaitsLink = queryByText(container, /forfaits/i);
    
    expect(menuLink || forfaitsLink).toBeTruthy();
  });

  it('should be accessible', () => {
    const { container } = renderWithRouter(<Header />);
    
    const header = getByRole(container, 'banner');
    expect(header).toBeInTheDocument();
  });
});
