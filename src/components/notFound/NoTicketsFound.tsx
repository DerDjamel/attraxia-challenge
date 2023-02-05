import { Box, Stack, Typography } from '@mui/material';
import DateIcon from '../icons/DateIcon';
import BiotechIcon from '@mui/icons-material/Biotech';

const NoTicketsFound = ({
  searchTerm,
  message
}: {
  searchTerm?: string;
  message: string;
}) => {
  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={1}
      sx={{ paddingBlock: 6 }}>
      <Box
        sx={{
          backgroundColor: '#EAF1FE',
          borderRadius: '100%',
          padding: 6,
          marginBottom: 3
        }}>
        {!searchTerm ? (
          <DateIcon />
        ) : (
          <BiotechIcon
            sx={{
              fontSize: 90
            }}
          />
        )}
      </Box>
      <Typography
        sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
        variant={'h5'}>
        No Tickets Found {searchTerm ? `for "${searchTerm}"` : null}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#555555',
          textTransform: 'capitalize',
          fontWeight: 400
        }}>
        {message}
      </Typography>
    </Stack>
  );
};

export default NoTicketsFound;
