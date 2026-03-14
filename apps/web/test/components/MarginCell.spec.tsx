import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MarginCell } from '../../src/components/Table/MarginCell';

describe('MarginCell', () => {
  it('should render with initial value', () => {
    render(<MarginCell value={10} onChange={vi.fn()} />);
    const input = screen.getByDisplayValue('10');
    expect(input).toBeInTheDocument();
  });

  it('should update on input change', async () => {
    const user = userEvent.setup();
    render(<MarginCell value={10} onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('10') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '25');

    expect(input.value).toBe('25');
  });

  it('should show error state for values below 5', async () => {
    const user = userEvent.setup();
    render(<MarginCell value={10} onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('10') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '3');

    expect(input.parentElement).toHaveClass('bg-red-50');
  });

  it('should call onChange after debounce', async () => {
    vi.useFakeTimers();
    const handleChange = vi.fn();

    render(<MarginCell value={10} onChange={handleChange} />);
    const input = screen.getByDisplayValue('10') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '50' } });

    expect(handleChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(handleChange).toHaveBeenCalledWith(50);
    vi.useRealTimers();
  });

  it('should restore value on blur if invalid', async () => {
    const user = userEvent.setup();
    render(<MarginCell value={10} onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('10') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '3');
    await user.click(document.body);

    expect(input.value).toBe('10');
  });
});
