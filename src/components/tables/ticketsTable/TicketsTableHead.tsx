import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { memo } from 'react';
import {
  ColumnsOptions,
  SortDirections,
  TableColumnType
} from '../../../utils/types';

function TicketsTableHead({
  tableColumns,
  sortedBy,
  sortDirection,
  sortTableByColumn
}: {
  tableColumns: TableColumnType[];
  sortedBy: ColumnsOptions;
  sortDirection: SortDirections;
  sortTableByColumn: (tableColumn: ColumnsOptions) => void;
}) {
  return (
    <TableHead>
      <TableRow
        sx={{
          textTransform: 'uppercase'
        }}>
        {tableColumns.map((column) => {
          return (
            <TableCell
              key={column.id}
              sortDirection={sortDirection}
              sx={{ fontSize: 12, fontWeight: 'bold' }}>
              <TableSortLabel
                active={sortedBy === column.id}
                direction={sortDirection}
                onClick={(e) => sortTableByColumn(column.id)}>
                {column.name}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default memo(TicketsTableHead);
