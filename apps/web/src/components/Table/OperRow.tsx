import type { Operation } from '../../mocks/mock-clients-pricing';
import { VOLUME_COLUMNS } from '../../mocks/mock-clients-pricing';
import { useOperations } from '../../context/OperationsContext';
import { MarginCell } from './MarginCell';

interface OperRowProps {
  operation: Operation;
}

export function OperRow({ operation }: OperRowProps) {
  const { deleteOperation } = useOperations();

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 font-medium text-slate-700">{operation.name}</td>
      {VOLUME_COLUMNS.map((volume) => (
        <MarginCell key={volume} value={operation.margins[volume]} />
      ))}
      <td className="px-4 py-3 text-center">
        <button
          type="button"
          onClick={() => deleteOperation(operation.id)}
          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
          title="Eliminar operación"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}
