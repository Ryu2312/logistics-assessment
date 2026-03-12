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

export const OPERATIONS = ['Logística', 'Flete', 'Distribución', 'Carga'] as const;

export type VolumeKey = (typeof VOLUME_COLUMNS)[number];
export type OperationType = (typeof OPERATIONS)[number];

export type Operation = {
    id: string;
    name: OperationType | string;
    margins: Record<VolumeKey, number>;
};

export const mockOperations: Operation[] = [
    {
        id: 'op-logistica',
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
        id: 'op-flete',
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
        id: 'op-distribucion',
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
    {
        id: 'op-carga',
        name: 'Carga',
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
];