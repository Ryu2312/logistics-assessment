export type VolumeRange = 'KG_300' | 'KG_500' | 'T_1' | 'T_3' | 'T_5' | 'T_10' | 'T_20' | 'T_30';

export type Plant = {
    id: string;
    name: string;
};

export type Margin = {
    volume: VolumeRange;
    margin: number | null;
}

export type Operation = {
    operationId: string;
    operationName: string;
    margins: Margin[];
};

export type OperationsContextType = {
    plants: Plant[];
    operations: Operation[];
    selectedPlantId: string;
    setSelectedPlantId: (id: string) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    loading: boolean;
    error: string | null;
    createOperation: (name: string) => Promise<void>;
    deleteOperation: (operationId: string) => Promise<void>;
    upsertMargin: (
        operationId: string,
        margin: Margin,
    ) => Promise<void>;
};

export type CreateOperationResponse = {
    createOperation: {
        operationId: string;
        operationName: string;
        margins: Margin[];
    };
};

export type CreateOperationVariables = {
    input: {
        name: string;
    };
};

export type DeleteOperationResponse = {
    deleteOperation: boolean;
};

export type DeleteOperationVariables = {
    input: {
        id: string;
    };
};

export type UpsertOperationMarginsResponse = {
    upsertOperationMargins: {
        operationId: string;
        operationName: string;
        margins: {
            volume: VolumeRange;
            margin: number;
        }[];
    }[];
};

export type UpsertOperationMarginsVariables = {
    input: {
        plantId: string;
        operationId: string;
        margins: Margin[];
    };
};