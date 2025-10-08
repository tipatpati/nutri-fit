import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryBadge } from '@/presentation/components/atoms/Badge/CategoryBadge';

describe('CategoryBadge Component', () => {
  const defaultProps = {
    emoji: '🍽️',
    label: 'Équilibré',
    gradient: 'from-emerald-400 to-green-500',
  };

  it('should render with provided props', () => {
    render(<CategoryBadge {...defaultProps} />);
    
    const badge = screen.getByRole('button');
    expect(badge).toBeInTheDocument();
    
    const label = screen.getByText('Équilibré');
    expect(label).toBeInTheDocument();
  });

  it('should display emoji', () => {
    render(<CategoryBadge {...defaultProps} />);
    
    const emoji = screen.getByText('🍽️');
    expect(emoji).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<CategoryBadge {...defaultProps} onClick={handleClick} />);
    
    const badge = screen.getByRole('button');
    await user.click(badge);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not error when onClick is not provided', async () => {
    const user = userEvent.setup();
    render(<CategoryBadge {...defaultProps} />);
    
    const badge = screen.getByRole('button');
    expect(async () => await user.click(badge)).not.toThrow();
  });

  it('should apply gradient class', () => {
    render(<CategoryBadge {...defaultProps} />);
    
    const badge = screen.getByRole('button');
    expect(badge.className).toContain('from-emerald-400');
    expect(badge.className).toContain('to-green-500');
  });

  it('should be keyboard accessible', () => {
    const handleClick = vi.fn();
    render(<CategoryBadge {...defaultProps} onClick={handleClick} />);
    
    const badge = screen.getByRole('button');
    badge.focus();
    
    expect(document.activeElement).toBe(badge);
  });
});
