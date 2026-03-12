import { useState } from 'react';
import { mockOperations } from '../mocks/mock-clients-pricing';
import type { Operation } from '../mocks/mock-clients-pricing';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Table } from '../components/Table';

export function ClientsPricingPage() {
  const [selectedPlant, setSelectedPlant] = useState('Perú');
  const [searchValue, setSearchValue] = useState('');
  const [operations, setOperations] = useState<Operation[]>(mockOperations);

  const handleAddOperation = () => {
    const newOperation: Operation = {
      id: `op-new-${Date.now()}`,
      name: 'Nueva Operación',
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
    setOperations([...operations, newOperation]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-700 antialiased">
      <Sidebar selectedPlant={selectedPlant} onPlantChange={setSelectedPlant} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />

        <section className="flex-1 overflow-auto p-6">
          <Table rows={operations} onAddOperation={handleAddOperation} />
        </section>
      </main>
    </div>
  );
}
