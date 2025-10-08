import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MealCard from '@/components/menu/MealCard';

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

  const mockGetCategoryColor = (category: string) => '#D4B961';

  it('should render meal name', () => {
    renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const name = screen.getByText('Poulet grillé aux légumes');
    expect(name).toBeInTheDocument();
  });

  it('should display premium badge for premium meals', () => {
    const premiumMeal = { ...mockMeal, premium: true };
    renderWithRouter(<MealCard meal={premiumMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const premiumBadge = screen.getByText(/premium/i);
    expect(premiumBadge).toBeInTheDocument();
  });

  it('should not display premium badge for non-premium meals', () => {
    renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const premiumBadge = screen.queryByText(/premium/i);
    expect(premiumBadge).not.toBeInTheDocument();
  });

  it('should display meal image', () => {
    renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('should have accessible image alt text', () => {
    renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt');
    expect(image.getAttribute('alt')).toBeTruthy();
  });

  it('should display badge if provided', () => {
    renderWithRouter(<MealCard meal={mockMeal} getCategoryColor={mockGetCategoryColor} />);
    
    const badge = screen.getByText('Nouveau');
    expect(badge).toBeInTheDocument();
  });
});
