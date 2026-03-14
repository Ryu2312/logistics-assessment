import { useCallback, useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { AddOperationModal } from '../components/Modal/AddOperationModal';
import { Margin } from '../context/types';

export function ClientsPricingPage() {
  const {
    plants,
    selectedPlantId,
    setSelectedPlantId,
    searchValue,
    setSearchValue,
    operations,
    createOperation,
    deleteOperation,
    upsertMargin,
    loading,
    error,
  } = useOperations();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = useCallback(
    (operationId: string) => {
      return deleteOperation(operationId);
    },
    [deleteOperation],
  );

  const handleMarginChange = useCallback(
    (operationId: string, margin: Margin) => {
      return upsertMargin(operationId, margin);
    },
    [upsertMargin],
  );

  const handleAddOperation = useCallback((name: string) => {
    return createOperation(name);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-700 antialiased">
      <Sidebar
        plants={plants}
        selectedPlantId={selectedPlantId}
        onPlantChange={setSelectedPlantId}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />

        <section className="flex-1 overflow-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              Error al cargar datos: {error}
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-slate-600">Cargando operaciones...</div>
            </div>
          )}
          {!loading && (
            <Table
              rows={operations}
              onAddOperation={() => setIsModalOpen(true)}
              onDelete={handleDelete}
              onMarginChange={handleMarginChange}
            />
          )}
        </section>
      </main>

      <AddOperationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddOperation}
      />
    </div>
  );
}
