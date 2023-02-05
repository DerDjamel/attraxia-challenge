import { Container, Stack } from '@mui/material';
import { lazy } from 'react';
import AppLayout from './layouts/AppLayout';

const SupportSection = lazy(
  () => import('./components/sections/SupportSection')
);

const TicketsSection = lazy(
  () => import('./components/sections/TicketsSection')
);

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Stack spacing={4}>
          <SupportSection></SupportSection>
          <TicketsSection></TicketsSection>
        </Stack>
      </AppLayout>
    </div>
  );
}

export default App;
