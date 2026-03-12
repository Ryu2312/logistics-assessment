import type { Operation, VolumeKey } from '../../mocks/mock-clients-pricing';
import { VOLUME_COLUMNS } from '../../mocks/mock-clients-pricing';
import { Button } from '../Button';
import { OperRow } from './OperRow';

function formatVolumeLabel(volume: VolumeKey) {
  switch (volume) {
    case 'KG_300':
      return '300 kg';
    case 'KG_500':
      return '500 kg';
    case 'T_1':
      return '1 T';
    case 'T_3':
      return '3 T';
    case 'T_5':
      return '5 T';
    case 'T_10':
      return '10 T';
    case 'T_20':
      return '20 T';
    case 'T_30':
      return '30 T';
    default:
      return volume;
  }
}

interface TableProps {
  rows: Operation[];
  onAddOperation?: () => void;
}

export function Table({ rows, onAddOperation }: TableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 border-r border-slate-700">Operación</th>
            {VOLUME_COLUMNS.map((volume) => (
              <th key={volume} className="px-4 py-3 border-r border-slate-700 text-center">
                {formatVolumeLabel(volume)}
              </th>
            ))}
            <th className="px-4 py-3 text-center w-12">Acciones</th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-slate-200">
          {rows.map((operation) => (
            <OperRow key={operation.id} operation={operation} />
          ))}
        </tbody>
      </table>

      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
        <Button variant="primary" size="sm" onClick={onAddOperation}>
          + Agregar Operación
        </Button>
      </div>
    </div>
  );
}
