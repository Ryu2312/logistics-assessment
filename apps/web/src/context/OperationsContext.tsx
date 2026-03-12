import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockOperationsByPlant } from '../mocks/mock-clients-pricing';
import type { Operation, PlantType } from '../mocks/mock-clients-pricing';

interface OperationsContextType {
  operations: Operation[];
  filteredOperations: Operation[];
  searchValue: string;
  selectedPlant: PlantType;

  setSearchValue: (value: string) => void;
  setSelectedPlant: (plant: PlantType) => void;
  addOperation: (name: string) => void;
  deleteOperation: (id: string) => void;
  updateOperation: (id: string, operation: Partial<Operation>) => void;
}

const OperationsContext = createContext<OperationsContextType | undefined>(undefined);

export function OperationsProvider({ children }: { children: ReactNode }) {
  const [selectedPlant, setSelectedPlant] = useState<PlantType>('Perú');
  const [operations, setOperations] = useState<Operation[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const plantOperations = mockOperationsByPlant.get(selectedPlant) || [];
    setOperations([...plantOperations]);
  }, [selectedPlant]);

  const filteredOperations = operations.filter((op) =>
    op.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const addOperation = (name: string) => {
    const newOperation: Operation = {
      id: `op-${selectedPlant.toLowerCase()}-${Date.now()}`,
      name,
      margins: {
        KG_300: 10,
        KG_500: 10,
        T_1: 10,
        T_3: 10,
        T_5: 10,
        T_10: 10,
        T_20: 10,
        T_30: 10,
      },
    };
    const newOperations = [...operations, newOperation];
    setOperations(newOperations);
    mockOperationsByPlant.set(selectedPlant, newOperations);
  };

  const deleteOperation = (id: string) => {
    const newOperations = operations.filter((op) => op.id !== id);
    setOperations(newOperations);
    mockOperationsByPlant.set(selectedPlant, newOperations);
  };

  const updateOperation = (id: string, updates: Partial<Operation>) => {
    const newOperations = operations.map((op) => (op.id === id ? { ...op, ...updates } : op));
    setOperations(newOperations);
    mockOperationsByPlant.set(selectedPlant, newOperations);
  };

  return (
    <OperationsContext.Provider
      value={{
        operations,
        filteredOperations,
        searchValue,
        selectedPlant,
        setSearchValue,
        setSelectedPlant,
        addOperation,
        deleteOperation,
        updateOperation,
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
