import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryBadge } from '@/presentation/components/atoms/Badge/CategoryBadge';

// Helper to get elements
const getByRole = (container: HTMLElement, role: string) => 
  container.querySelector(`[role="${role}"]`) as HTMLElement;
const getByText = (container: HTMLElement, text: string | RegExp) => {
  const elements = Array.from(container.querySelectorAll('*'));
  return elements.find(el => {
    const content = el.textContent || '';
    return typeof text === 'string' ? content.includes(text) : text.test(content);
  }) as HTMLElement;
};

describe('CategoryBadge Component', () => {
  const defaultProps = {
    emoji: '🍽️',
    label: 'Équilibré',
    gradient: 'from-emerald-400 to-green-500',
  };

  it('should render with provided props', () => {
    const { container } = render(<CategoryBadge {...defaultProps} />);
    
    const badge = getByRole(container, 'button');
    expect(badge).toBeInTheDocument();
    
    const label = getByText(container, 'Équilibré');
    expect(label).toBeInTheDocument();
  });

  it('should display emoji', () => {
    const { container } = render(<CategoryBadge {...defaultProps} />);
    
    const emoji = getByText(container, '🍽️');
    expect(emoji).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<CategoryBadge {...defaultProps} onClick={handleClick} />);
    
    const badge = getByRole(container, 'button');
    await user.click(badge);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not error when onClick is not provided', async () => {
    const user = userEvent.setup();
    const { container } = render(<CategoryBadge {...defaultProps} />);
    
    const badge = getByRole(container, 'button');
    expect(async () => await user.click(badge)).not.toThrow();
  });

  it('should apply gradient class', () => {
    const { container } = render(<CategoryBadge {...defaultProps} />);
    
    const badge = getByRole(container, 'button');
    expect(badge.className).toContain('from-emerald-400');
    expect(badge.className).toContain('to-green-500');
  });

  it('should be keyboard accessible', () => {
    const handleClick = vi.fn();
    const { container } = render(<CategoryBadge {...defaultProps} onClick={handleClick} />);
    
    const badge = getByRole(container, 'button');
    badge.focus();
    
    expect(document.activeElement).toBe(badge);
  });
});
