export const VOLUME_COLUMNS = [
    'KG_300',
    'KG_500',
    'T_1',
    'T_3',
    'T_5',
    'T_10',
    'T_20',
    'T_30',
] as const;

export const PLANTS = ['Perú', 'México', 'Colombia'] as const;

export type VolumeKey = (typeof VOLUME_COLUMNS)[number];
export type PlantType = (typeof PLANTS)[number];

export type Operation = {
    id: string;
    name: string;
    margins: Record<VolumeKey, number>;
};


const peru_operations: Operation[] = [
    {
        id: 'op-peru-1',
        name: 'Logística',
        margins: {
            KG_300: 15,
            KG_500: 15,
            T_1: 14,
            T_3: 14,
            T_5: 13,
            T_10: 12,
            T_20: 11,
            T_30: 10,
        },
    },
    {
        id: 'op-peru-2',
        name: 'Flete',
        margins: {
            KG_300: 10,
            KG_500: 10,
            T_1: 9,
            T_3: 9,
            T_5: 8,
            T_10: 8,
            T_20: 7,
            T_30: 7,
        },
    },
    {
        id: 'op-peru-3',
        name: 'Distribución',
        margins: {
            KG_300: 18,
            KG_500: 18,
            T_1: 17,
            T_3: 17,
            T_5: 16,
            T_10: 15,
            T_20: 14,
            T_30: 13,
        },
    },
];

const mexico_operations: Operation[] = [
    {
        id: 'op-mexico-1',
        name: 'Logística',
        margins: {
            KG_300: 12,
            KG_500: 12,
            T_1: 11,
            T_3: 11,
            T_5: 10,
            T_10: 10,
            T_20: 9,
            T_30: 8,
        },
    },
    {
        id: 'op-mexico-2',
        name: 'Carga',
        margins: {
            KG_300: 14,
            KG_500: 14,
            T_1: 13,
            T_3: 13,
            T_5: 12,
            T_10: 12,
            T_20: 11,
            T_30: 10,
        },
    },
];

const colombia_operations: Operation[] = [
    {
        id: 'op-colombia-1',
        name: 'Transporte',
        margins: {
            KG_300: 16,
            KG_500: 16,
            T_1: 15,
            T_3: 15,
            T_5: 14,
            T_10: 13,
            T_20: 12,
            T_30: 11,
        },
    },
];

export const mockOperationsByPlant = new Map<PlantType, Operation[]>([
    ['Perú', peru_operations],
    ['México', mexico_operations],
    ['Colombia', colombia_operations],
]);

export const mockOperations = peru_operations;