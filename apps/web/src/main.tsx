import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { apolloClient } from './lib/apollo/client';
import { OperationsProvider } from './context/OperationsContext';
import { ClientsPricingPage } from './pages/clients-pricing-page';
import { ApolloProvider } from '@apollo/client/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <OperationsProvider>
        <ClientsPricingPage />
      </OperationsProvider>
    </ApolloProvider>
  </StrictMode>,
);
