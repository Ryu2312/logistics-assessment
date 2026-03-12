import { MenuItem } from './MenuItem';
import { Select } from './Select';
import type { PlantType } from '../mocks/mock-clients-pricing';
import { PLANTS } from '../mocks/mock-clients-pricing';

interface SidebarProps {
  selectedPlant: PlantType;
  onPlantChange: (plant: PlantType) => void;
}

export function Sidebar({ selectedPlant, onPlantChange }: SidebarProps) {
  const menuItems = [
    '1. Precios Base',
    '2. Waste',
    '3. Costos indirectos',
    '4. Clientes',
    '5. Comisiones',
    '6. Tipos de cambio',
    '7. Tasa financiera anual',
    '8. Logística',
    '9. Embalaje especial',
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-100">
        <Select
          options={PLANTS as unknown as string[]}
          value={selectedPlant}
          onChange={(e) => onPlantChange(e.target.value as PlantType)}
        />
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = item === '4. Clientes';
          return <MenuItem key={item} label={item} isActive={isActive} />;
        })}
      </nav>
    </aside>
  );
}
