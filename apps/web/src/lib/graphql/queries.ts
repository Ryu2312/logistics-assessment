import { gql } from '@apollo/client';

export const GET_PLANTS = gql`
  query GetPlants {
    plants {
      id
      name
    }
  }
`;

export const GET_PLANT_OPERATIONS = gql`
  query GetPlantOperations($plantId: ID!) {
    plantOperations(plantId: $plantId) {
      operationId
      operationName
      margins {
        volume
        margin
      }
    }
  }
`;

export const CREATE_OPERATION = gql`
  mutation CreateOperation($input: CreateOperationInput!) {
    createOperation(input: $input) {
      id
      name
    }
  }
`;

export const DELETE_OPERATION = gql`
  mutation DeleteOperation($input: DeleteOperationInput!) {
    deleteOperation(input: $input)
  }
`;

export const UPSERT_OPERATION_MARGINS = gql`
  mutation UpsertOperationMargins($input: UpsertOperationMarginsInput!) {
    upsertOperationMargins(input: $input) {
      operationId
      operationName
      margins {
        volume
        margin
      }
    }
  }
`;