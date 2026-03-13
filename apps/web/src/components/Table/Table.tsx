import { Margin, Operation } from '../../context/types';
import { Button } from '../Button';
import { OperRow } from './OperRow';

interface TableProps {
  rows: Operation[];
  onAddOperation?: () => void;
  onDelete: (operationId: string) => Promise<void>;
  onMarginChange: (operationId: string, margin: Margin) => Promise<void>;
}

export function Table({ rows, onAddOperation, onDelete, onMarginChange }: TableProps) {
  const volumens = ['300 KG', '500 KG', '1 T', '3 T', '5 T', '10 T', '20 T', '30 T'];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 border-r border-slate-700">Operación</th>
            {volumens.map((volume) => (
              <th key={volume} className="px-4 py-3 border-r border-slate-700 text-center">
                {volume}
              </th>
            ))}
            <th className="px-4 py-3 text-center w-12">Acciones</th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-slate-200">
          {rows.map((operation) => (
            <OperRow
              key={operation.operationId}
              operation={operation}
              onDelete={onDelete}
              onMarginChange={onMarginChange}
            />
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
