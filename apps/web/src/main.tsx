import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ClientsPricingPage } from './pages/clients-pricing-page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientsPricingPage />
  </StrictMode>,
);
