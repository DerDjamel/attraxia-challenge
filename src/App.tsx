import { Container, Stack } from '@mui/material';
import Navigationbar from './components/navigations/NavigationBar';
import SupportSection from './components/sections/SupportSection';
import TicketsSection from './components/sections/TicketsSection';

function App() {
  return (
    <div className="App">
      <Navigationbar></Navigationbar>

      <Container>
        <Stack spacing={4}>
          <SupportSection></SupportSection>
          <TicketsSection></TicketsSection>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
