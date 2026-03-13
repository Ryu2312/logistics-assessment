import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: import.meta.env['VITE_GRAPHQL_URL'] || 'http://localhost:3000/graphql',
    credentials: 'include',
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
