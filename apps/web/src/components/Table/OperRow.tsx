import { memo } from 'react';
import { Margin, Operation } from '../../context/types';
import { MarginCell } from './MarginCell';

interface OperRowProps {
  operation: Operation;
  onDelete: (operationId: string) => Promise<void>;
  onMarginChange: (operationId: string, margin: Margin) => Promise<void>;
}

export const OperRow = memo(function OperRow({
  operation,
  onDelete,
  onMarginChange,
}: OperRowProps) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 font-medium text-slate-700">{operation.operationName}</td>
      {operation.margins.map((operationMargin) => (
        <MarginCell
          key={operation.operationName + operationMargin.volume}
          value={operationMargin.margin}
          onChange={(newValue) => {
            onMarginChange(operation.operationId, {
              volume: operationMargin.volume,
              margin: newValue ?? 0,
            });
          }}
        />
      ))}
      <td className="px-4 py-3 text-center">
        <button
          type="button"
          onClick={() => onDelete(operation.operationId)}
          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
          title="Eliminar operación"
        >
          ✕
        </button>
      </td>
    </tr>
  );
});
