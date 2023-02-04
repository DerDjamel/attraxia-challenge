import { SortDirections, TicketStatusType, TicketType } from './types';

export function sortComparator<T>(
  orderBy: keyof T,
  sortDirection: SortDirections
) {
  const direction = sortDirection === 'asc' ? -1 : 1;
  return (a: T, b: T) => {
    if (b[orderBy] < a[orderBy]) {
      return -1 * direction;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1 * direction;
    }
    return 0;
  };
}

const statusColor = {
  open: 'primary',
  resolved: 'success',
  feedback: 'secondary'
} as const;

export function statusToColor(
  status: TicketStatusType
): (typeof statusColor)[TicketStatusType] {
  return statusColor[status];
}

export function getMenuItems(rows: TicketType[]) {
  const items: {
    all: number;
    open: number;
    resolved: number;
    feedback: number;
  } = {
    all: rows.length,
    open: 0,
    resolved: 0,
    feedback: 0
  };
  rows.map((row) => {
    items[row.status] += 1;
  });
  return items;
}
