import { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import type { PlantType } from '../mocks/mock-clients-pricing';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { AddOperationModal } from '../components/Modal/AddOperationModal';

export function ClientsPricingPage() {
  const {
    filteredOperations,
    searchValue,
    selectedPlant,
    setSearchValue,
    setSelectedPlant,
    addOperation,
  } = useOperations();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOperation = (name: string) => {
    addOperation(name);
  };

  const handlePlantChange = (plant: PlantType) => {
    setSelectedPlant(plant);
    setSearchValue(''); // Limpiar búsqueda al cambiar planta
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-700 antialiased">
      <Sidebar selectedPlant={selectedPlant as PlantType} onPlantChange={handlePlantChange} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />

        <section className="flex-1 overflow-auto p-6">
          <Table rows={filteredOperations} onAddOperation={() => setIsModalOpen(true)} />
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
