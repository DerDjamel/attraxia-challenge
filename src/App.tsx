import { Container, Stack } from '@mui/material';
import Navigationbar from './components/navigations/NavigationBar';
import SupportSection from './components/sections/SupportSection';
import TicketsTable from './components/sections/TicketsTable';

function App() {
  return (
    <div className="App">
      <Navigationbar></Navigationbar>

      <Container>
        <Stack spacing={4}>
          <SupportSection></SupportSection>
          <TicketsTable></TicketsTable>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
