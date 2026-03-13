import { useQuery } from '@apollo/client/react';
import { GET_PLANT_OPERATIONS, GET_PLANTS } from '../../lib/graphql/queries';
import { Operation, Plant } from '../types';
import { transformOperations } from '../utils';
import { useMemo } from 'react';

export type GetPlantsResponse = {
    plants: Plant[];
};

export function usePlantsQuery() {
    const { data, loading, error } = useQuery<GetPlantsResponse>(GET_PLANTS);

    const plants = data?.plants ?? [];

    return { plants, loading, error };
}

export type GetPlantOperationsResponse = {
    plantOperations: Operation[]
};

export function useOperationsQuery(plantId: string) {
    const { data, loading, error, refetch } = useQuery<GetPlantOperationsResponse>(GET_PLANT_OPERATIONS, {
        variables: { plantId },
        skip: !plantId,
    });

    const operations = transformOperations(data?.plantOperations ?? []);

    return { operations, loading, error, refetch };
}
