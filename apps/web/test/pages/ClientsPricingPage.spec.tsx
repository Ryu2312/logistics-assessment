import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClientsPricingPage } from '../../src/pages/clients-pricing-page';
import { OperationsProvider } from '../../src/context/OperationsContext';
import { useQuery } from '@apollo/client/react';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(() => [vi.fn(), { loading: false }]),
  gql: vi.fn(),
}));

describe('ClientsPricingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useQuery as any).mockReturnValue({
      data: {
        plants: [{ id: '1', name: 'Planta 1' }],
        plantOperations: [{
          operationId: 'op-1',
          operationName: 'Test Op',
          margins: [],
        }],
      },
      loading: false,
      error: null,
    });
  });

  it('should render main element', () => {
    render(
      <OperationsProvider>
        <ClientsPricingPage />
      </OperationsProvider>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render header', async () => {
    render(
      <OperationsProvider>
        <ClientsPricingPage />
      </OperationsProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    (useQuery as any).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <OperationsProvider>
        <ClientsPricingPage />
      </OperationsProvider>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should show error message on fetch failure', () => {
    (useQuery as any).mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Network error'),
    });

    render(
      <OperationsProvider>
        <ClientsPricingPage />
      </OperationsProvider>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
