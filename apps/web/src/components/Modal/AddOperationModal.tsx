import { useState } from 'react';
import { Button } from '../Button';

interface AddOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddOperationModal({ isOpen, onClose, onAdd }: AddOperationModalProps) {
  const [operationName, setOperationName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (operationName.trim()) {
      onAdd(operationName);
      setOperationName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Agregar Operación</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="opName" className="block text-sm font-medium text-slate-700 mb-2">
              Nombre de la Operación
            </label>
            <input
              id="opName"
              type="text"
              value={operationName}
              onChange={(e) => setOperationName(e.target.value)}
              placeholder="Ej: Logística, Flete, Carga..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" size="md" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1"
              disabled={!operationName.trim()}
            >
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
