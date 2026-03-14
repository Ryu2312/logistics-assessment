import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { OperationsProvider, useOperations } from '../../src/context/OperationsContext';
import React from 'react';
import { useQuery } from '@apollo/client/react';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(() => [vi.fn(), { loading: false }]),
  gql: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(OperationsProvider, null, children);

const mockPlants = [
  { id: 'p-1', name: 'Planta 1' },
  { id: 'p-2', name: 'Planta 2' },
];

describe('useOperations', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useQuery as any).mockImplementation((query: any) => {
      if (
        query.toString().includes('plants') ||
        query.definitions?.[0]?.name?.value === 'GetPlants'
      ) {
        return {
          data: {
            plants: mockPlants,
          },
          loading: false,
          error: null,
        };
      }
      return {
        data: {
          plantOperations: [{
            operationId: 'op-1',
            operationName: 'Test Op',
            margins: [],
          }],
        },
        loading: false,
        error: null,
      };
    });
  });

  it('should provide context values', () => {
    const { result } = renderHook(() => useOperations(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.plants).toBeDefined();
    expect(result.current.operations).toBeDefined();
  });

  it('should update selected plant', () => {
    const { result } = renderHook(() => useOperations(), { wrapper });

    act(() => {
      result.current.setSelectedPlantId('new-plant');
    });

    expect(result.current.selectedPlantId).toBe('new-plant');
  });

  it('should update search value', () => {
    const { result } = renderHook(() => useOperations(), { wrapper });

    act(() => {
      result.current.setSearchValue('test');
    });

    expect(result.current.searchValue).toBe('test');
  });

  it('should throw error when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useOperations());
    }).toThrow('useOperations debe ser usado dentro de OperationsProvider');

    consoleSpy.mockRestore();
  });
});
