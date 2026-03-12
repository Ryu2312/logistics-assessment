import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { OperationsProvider } from './context/OperationsContext';
import { ClientsPricingPage } from './pages/clients-pricing-page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OperationsProvider>
      <ClientsPricingPage />
    </OperationsProvider>
  </StrictMode>,
);
