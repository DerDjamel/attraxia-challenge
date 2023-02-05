import {
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Typography,
  Chip,
  Grid,
  Avatar,
  Badge
} from '@mui/material';
import { statusToColor } from '../../../utils/helpers';
import FaceIcon from '@mui/icons-material/Face';
import { TicketType } from '../../../utils/types';
import { memo } from 'react';

function TicketsTableBody({ data }: { data: TicketType[] }) {
  return (
    <TableBody>
      {data?.map((row) => {
        return (
          <TableRow key={row.title}>
            <TableCell>
              <Stack direction={'column'}>
                <Typography
                  variant={'body1'}
                  color={'#286EF1'}
                  sx={{ fontWeight: 'bold' }}>
                  {row.title}
                </Typography>
                <Typography variant={'body1'} color={'#555'}>
                  {row.subtitle}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Chip
                label={row.status}
                color={statusToColor(row.status)}
                size="small"
                sx={{ textTransform: 'uppercase' }}
              />
            </TableCell>
            <TableCell>{row.createdOn}</TableCell>
            <TableCell>
              <Grid container spacing={1}>
                <Grid item xs={1} sx={{ marginRight: 1 }}>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Remy Sharp"
                    src={row.lastUser.avatar}
                  />
                </Grid>
                <Grid item xs sx={{ marginRight: 2 }}>
                  <Typography sx={{ fontWeight: 400, paddingTop: 0.5 }}>
                    Last by {row.lastUser.username}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Badge
                    badgeContent={row.replies}
                    sx={{
                      '.MuiBadge-badge': {
                        borderRadius: 1,
                        backgroundColor: '#EDEDED',
                        marginRight: 3,
                        marginTop: 0.5
                      }
                    }}
                  />
                  {row.lastUser.role ? (
                    <Chip
                      size="small"
                      icon={<FaceIcon />}
                      sx={{ marginTop: 0.5 }}
                      label={
                        <Typography variant={'button'}>
                          {row.lastUser.role}
                        </Typography>
                      }
                    />
                  ) : null}
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default memo(TicketsTableBody);
