import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { memo } from 'react';
import {
  ColumnsOptions,
  SortDirections,
  TableColumnType
} from '../../../utils/types';

const TableColumns: TableColumnType[] = [
  {
    name: 'Tickets',
    id: 'title'
  },
  {
    name: 'Status',
    id: 'status'
  },
  {
    name: 'Created on',
    id: 'createdOn'
  },
  {
    name: 'Replies',
    id: 'replies'
  }
];

function TicketsTableHead({
  sortedBy,
  sortDirection,
  sortTableByColumn
}: {
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
        {TableColumns.map((column) => {
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
