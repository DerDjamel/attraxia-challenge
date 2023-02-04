export type SortDirections = 'asc' | 'desc';
export type TicketStatusType = 'open' | 'resolved' | 'feedback';

export type UserType = {
  username: string;
  avatar: string;
  role?: string;
};

export type ColumnsOptions = keyof Omit<TicketType, 'subtitle' | 'lastUser'>;

export type TableColumnType = {
  name: string;
  id: ColumnsOptions;
};

export type TicketType = {
  title: string;
  subtitle: string;
  status: TicketStatusType;
  createdOn: string;
  replies: number;
  lastUser: UserType;
};
