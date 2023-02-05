import { Box, CircularProgress, Container } from '@mui/material';
import { PropsWithChildren, Suspense } from 'react';
import Navigationbar from '../components/navigations/NavigationBar';

const AppLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Navigationbar></Navigationbar>
      <Container>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: 5
              }}>
              <CircularProgress />
            </Box>
          }>
          {children}
        </Suspense>
      </Container>
    </>
  );
};

export default AppLayout;
