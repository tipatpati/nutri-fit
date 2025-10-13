import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MealCard from '@/components/menu/MealCard';

// Helper functions
const getByText = (container: HTMLElement, text: string | RegExp) => {
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
const getByRole = (container: HTMLElement, role: string) => 
  container.querySelector(`[role="${role}"]`) as HTMLElement;

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MealCard Component', () => {
  const mockMeal = {
    id: 1,
    name: 'Poulet grillé aux légumes',
    image: 'https://example.com/meal.jpg',
    category: 'Équilibré',
    premium: false,
    badge: 'Nouveau',
  };

  const mockGetCategoryColor = (category: string) => ({ bg: 'bg-yellow-500', text: 'text-white', hex: '#D4B961' });

  it('should render meal name', () => {
    const { container } = renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const name = getByText(container, 'Poulet grillé aux légumes');
    expect(name).toBeInTheDocument();
  });

  it('should display premium badge for premium meals', () => {
    const premiumMeal = { ...mockMeal, premium: true };
    const { container } = renderWithRouter(<MealCard meal={premiumMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const premiumBadge = getByText(container, /premium/i);
    expect(premiumBadge).toBeInTheDocument();
  });

  it('should not display premium badge for non-premium meals', () => {
    const { container } = renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const premiumBadge = queryByText(container, /premium/i);
    expect(premiumBadge).not.toBeInTheDocument();
  });

  it('should display meal image', () => {
    const { container } = renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const image = getByRole(container, 'img');
    expect(image).toBeInTheDocument();
  });

  it('should have accessible image alt text', () => {
    const { container } = renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const image = getByRole(container, 'img');
    expect(image).toHaveAttribute('alt');
    expect(image.getAttribute('alt')).toBeTruthy();
  });

  it('should display badge if provided', () => {
    const { container } = renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const badge = getByText(container, 'Nouveau');
    expect(badge).toBeInTheDocument();
  });
});
