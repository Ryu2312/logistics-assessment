import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Operation, OperationsContextType, VolumeRange } from './types';
import {
  useCreateOperation,
  useDeleteOperation,
  useOperationsQuery,
  usePlantsQuery,
} from './hooks';
import { filterOperations } from './utils';
import { useUpsertMargin } from './hooks/useOperationsMutations';

const OperationsContext = createContext<OperationsContextType | null>(null);

export function OperationsProvider({ children }: { children: ReactNode }) {
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const { plants, loading: plantsLoading, error: plantsError } = usePlantsQuery();

  useEffect(() => {
    const plant = plants[0];

    if (!plant) return;

    setSelectedPlantId(plant.id);
  }, [plants]);

  const {
    operations,
    loading: operationsLoading,
    error: operationsError,
  } = useOperationsQuery(selectedPlantId);
  const { createOperation } = useCreateOperation(selectedPlantId);
  const { deleteOperation } = useDeleteOperation(selectedPlantId);
  const { upsertMargin } = useUpsertMargin(selectedPlantId);

  const filteredOperations = useMemo(
    () => filterOperations(operations, searchValue),
    [operations, searchValue],
  );

  const isLoading = plantsLoading || operationsLoading;

  const error = plantsError?.message || operationsError?.message || null;

  return (
    <OperationsContext.Provider
      value={{
        plants,
        operations: filteredOperations,
        selectedPlantId,
        setSelectedPlantId,
        searchValue,
        setSearchValue,
        loading: isLoading,
        error,
        createOperation,
        deleteOperation,
        upsertMargin,
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
}

export function useOperations() {
  const context = useContext(OperationsContext);

  if (!context) {
    throw new Error('useOperations debe ser usado dentro de OperationsProvider');
  }

  return context;
}
