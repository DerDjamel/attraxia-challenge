import {
  TableContainer,
  Paper,
  Box,
  CircularProgress,
  Table
} from '@mui/material';
import { memo } from 'react';
import {
  TicketType,
  TableColumnType,
  ColumnsOptions,
  SortDirections
} from '../../../utils/types';
import NoTicketsFound from './NoTicketsFound';
import TicketsTableBody from './TicketsTableBody';
import TicketsTableHead from './TicketsTableHead';

/**
 * This Components should have contained the pagination components but because going back to the desing it is out the table area
 * putting in here would need to make positioning adjusment that may cause problems
 */

const TicketsTable = ({
  data,
  sortedBy,
  sortDirection,
  sortTableByColumn,
  searchLoading,
  debouncedSearchValue
}: {
  data: TicketType[];
  sortedBy: ColumnsOptions;
  sortDirection: SortDirections;
  searchLoading: boolean;
  debouncedSearchValue: string;
  sortTableByColumn: (tableColumn: ColumnsOptions) => void;
}) => {
  return (
    <TableContainer elevation={0} component={Paper}>
      {searchLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 5
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data.length > 0 ? (
            <Table>
              <TicketsTableHead
                sortedBy={sortedBy}
                sortDirection={sortDirection}
                sortTableByColumn={sortTableByColumn}></TicketsTableHead>

              <TicketsTableBody data={data}></TicketsTableBody>
            </Table>
          ) : (
            <NoTicketsFound
              searchTerm={debouncedSearchValue}
              message="Please adjust your search term and try again."
            />
          )}
        </>
      )}
    </TableContainer>
  );
};

export default memo(TicketsTable);
