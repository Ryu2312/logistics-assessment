import type { VolumeRange, Operation, Margin } from './types';

export const VOLUMES: VolumeRange[] = ['KG_300', 'KG_500', 'T_1', 'T_3', 'T_5', 'T_10', 'T_20', 'T_30'];

export function mapMargins(
    margins: Margin[]
) {
    const map = new Map(margins.map((m) => [m.volume, m.margin]));

    return VOLUMES.map((volume) => ({
        volume,
        margin: map.get(volume) ?? null,
    }));
}

export function transformOperations(
    operations: Operation[],
) {
    return (
        operations.map((op: any) => ({
            operationId: op.operationId,
            operationName: op.operationName,
            margins: mapMargins(op.margins),
        })) ?? []
    );
}

export function filterOperations(
    operations: Operation[],
    searchValue: string,
): Operation[] {
    if (!searchValue) return operations;

    return operations.filter((op) =>
        op.operationName.toLowerCase().includes(searchValue.toLowerCase()),
    );
}


