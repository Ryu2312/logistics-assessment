import { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { AddOperationModal } from '../components/Modal/AddOperationModal';

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
              onDelete={deleteOperation}
              onMarginChange={upsertMargin}
            />
          )}
        </section>
      </main>

      <AddOperationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={createOperation}
      />
    </div>
  );
}
