import { useMutation } from '@apollo/client/react';
import {
    CREATE_OPERATION,
    DELETE_OPERATION,
    GET_PLANT_OPERATIONS,
    UPSERT_OPERATION_MARGINS,
} from '../../lib/graphql/queries';
import type { CreateOperationResponse, CreateOperationVariables, DeleteOperationResponse, DeleteOperationVariables, Margin, UpsertOperationMarginsResponse, UpsertOperationMarginsVariables, VolumeRange } from '../types';
import { GetPlantOperationsResponse } from './useOperationsQueries';
import { ApolloClient } from '@apollo/client';

export function useCreateOperation(plantId: string) {
    const [mutation, { loading }] = useMutation<
        CreateOperationResponse,
        CreateOperationVariables
    >(CREATE_OPERATION, {
        update(cache, { data }) {
            if (!data) return;

            const created = data.createOperation;

            const existing = cache.readQuery<GetPlantOperationsResponse>({
                query: GET_PLANT_OPERATIONS,
                variables: { plantId },
            });

            if (!existing) return;

            const alreadyExists = existing.plantOperations.some(
                (op) => op.operationId === created.operationId,
            );

            if (alreadyExists) return;

            cache.writeQuery<GetPlantOperationsResponse>({
                query: GET_PLANT_OPERATIONS,
                variables: { plantId },
                data: {
                    plantOperations: [...existing.plantOperations, created],
                },
            });
        },
    });

    const createOperation = async (name: string) => {
        if (!plantId) {
            throw new Error('No hay una planta seleccionada');
        }

        await mutation({
            variables: {
                input: {
                    plantId,
                    name,
                },
            },
        });
    };

    return { createOperation, loading };
}

export function useDeleteOperation(plantId: string) {
    const [mutation, { loading }] = useMutation<
        DeleteOperationResponse,
        DeleteOperationVariables
    >(DELETE_OPERATION);

    const deleteOperation = async (operationId: string) => {
        if (!plantId) {
            throw new Error('No hay una planta seleccionada');
        }

        await mutation({
            variables: {
                input: {
                    plantId,
                    operationId,
                },
            },
            update(cache, { data }) {
                if (!data?.deleteOperation) return;

                const existing = cache.readQuery<GetPlantOperationsResponse>({
                    query: GET_PLANT_OPERATIONS,
                    variables: { plantId },
                });

                if (!existing) return;

                cache.writeQuery<GetPlantOperationsResponse>({
                    query: GET_PLANT_OPERATIONS,
                    variables: { plantId },
                    data: {
                        plantOperations: existing.plantOperations.filter(
                            (op) => op.operationId !== operationId,
                        ),
                    },
                });
            },
        });
    };

    return { deleteOperation, loading };
}

export function useUpsertMargin(plantId: string) {
    const [mutation, { loading }] = useMutation<UpsertOperationMarginsResponse, UpsertOperationMarginsVariables>(UPSERT_OPERATION_MARGINS, {
        update(cache, { data }) {
            if (!data) return;

            const updated = data.upsertOperationMargins;

            const existing = cache.readQuery<GetPlantOperationsResponse>({
                query: GET_PLANT_OPERATIONS,
                variables: { plantId },
            });

            if (!existing) return;

            cache.writeQuery({
                query: GET_PLANT_OPERATIONS,
                variables: { plantId },
                data: {
                    plantOperations: existing.plantOperations.map((op) => {
                        const found = updated.find(
                            (item) => item.operationId === op.operationId
                        );

                        return found ?? op;
                    }),
                },
            });
        },
    });

    const upsertMargin = async (operationId: string, margin: Margin) => {
        if (!plantId) {
            throw new Error('No hay una planta seleccionada');
        }

        await mutation({
            variables: {
                input: {
                    plantId,
                    operationId,
                    margins: [margin],
                },
            },
        });
    };

    return { upsertMargin, loading };
}


