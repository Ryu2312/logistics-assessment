import { useMutation } from '@apollo/client/react';
import {
    CREATE_OPERATION,
    DELETE_OPERATION,
    GET_PLANT_OPERATIONS,
    UPSERT_OPERATION_MARGINS,
} from '../../lib/graphql/queries';
import type { CreateOperationResponse, CreateOperationVariables, DeleteOperationResponse, DeleteOperationVariables, Margin, UpsertOperationMarginsResponse, UpsertOperationMarginsVariables, VolumeRange } from '../types';
import { GetPlantOperationsResponse } from './useOperationsQueries';

export function useCreateOperation(plantId: string) {
    const [mutation] = useMutation<
        CreateOperationResponse,
        CreateOperationVariables
    >(CREATE_OPERATION, {
        update(cache, { data }) {
            if (!data) return;

            const created = data.createOperation;
            console.log(created);
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


        await mutation({
            variables: {
                input: {
                    name,
                },
            },
        });
    };


    return { createOperation };
}

export function useDeleteOperation(plantId: string) {
    const [mutation] = useMutation<
        DeleteOperationResponse,
        DeleteOperationVariables
    >(DELETE_OPERATION);

    const deleteOperation = async (id: string) => {

        await mutation({
            variables: {
                input: {
                    id,
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
                            (op) => op.operationId !== id,
                        ),
                    },
                });
            },
        });
    };

    return { deleteOperation };
}

export function useUpsertMargin(plantId: string) {
    const [mutation] = useMutation<UpsertOperationMarginsResponse, UpsertOperationMarginsVariables>(UPSERT_OPERATION_MARGINS, {
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

    return { upsertMargin };
}


