import {
  Box,
  Button,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Divider,
  TablePagination,
  Grid,
  CircularProgress
} from '@mui/material';
import NoTicketsFound from '../tables/ticketsTable/NoTicketsFound';
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchInput from '../inputs/SearchInput';
import {
  ColumnsOptions,
  SortDirections,
  TableColumnType,
  TicketStatusType,
  TicketType
} from '../../utils/types';
import {
  getMenuItems,
  sortComparator,
  statusToColor
} from '../../utils/helpers';
const TicketsTable = lazy(() => import('../tables/ticketsTable/TicketsTable'));

const rows: TicketType[] = [
  {
    title: 'some title 1',
    subtitle: '1 very long title with more letters and ',
    status: 'resolved',
    createdOn: 'Today @ 12:04 AM',
    replies: 5,
    lastUser: {
      username: 'Aba',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  },
  {
    title: 'some title 2',
    subtitle: '1 very long title with more letters and ',
    status: 'open',
    createdOn: 'Today @ 12:04 AM',
    replies: 4,
    lastUser: {
      username: 'Dermache Djamel',
      avatar: 'https://mui.com/static/images/avatar/1.jpg'
    }
  },
  {
    title: '3 very long title with more letters and',
    subtitle: '1 very long title with more letters and ',
    status: 'feedback',
    createdOn: 'Today @ 12:04 AM',
    replies: 5,
    lastUser: {
      username: 'Aba',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  },
  {
    title: '4 very long title with more letters and',
    subtitle: '1 very long title with more letters and ',
    status: 'feedback',
    createdOn: 'Today @ 12:04 AM',
    replies: 4,
    lastUser: {
      username: 'Dermache Djamel',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  },
  {
    title: '5 very long title with more letters and',
    subtitle: '1 very long title with more letters and ',
    status: 'feedback',
    createdOn: 'Today @ 12:04 AM',
    replies: 5,
    lastUser: {
      username: 'Aba',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  },
  {
    title: '6 very long title with more letters and',
    subtitle: '1 very long title with more letters and ',
    status: 'feedback',
    createdOn: 'Today @ 12:04 AM',
    replies: 4,
    lastUser: {
      username: 'Dermache Djamel',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  },
  {
    title: '7 very long title with more letters and',
    subtitle: '1 very long title with more letters and ',
    status: 'feedback',
    createdOn: 'Today @ 12:04 AM',
    replies: 5,
    lastUser: {
      username: 'Aba',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  },
  {
    title: '8 very long title with more letters and',
    subtitle: '1 very long title with more letters and ',
    status: 'open',
    createdOn: 'Today @ 12:04 AM',
    replies: 4,
    lastUser: {
      username: 'Dermache Djamel',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
    }
  }
];

const TicketsSection = () => {
  /* Sorted colums State */
  const [sortedBy, setSortedBy] = useState<ColumnsOptions>('title');
  const [sortDirection, setSortDirection] = useState<SortDirections>('desc');

  /* Search input State */
  const [search, setSearch] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(search);
  const [searchLoading, setSearchLoading] = useState(false);

  /**
   * Pagination State
   */
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  /* Menu State */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [keySelected, setKeySelected] = useState('all');
  const menuItems = useMemo(() => {
    return getMenuItems(rows);
  }, [rows]);

  const handleMenuItemClick = (key: string) => {
    setKeySelected(key);
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Displayed Table Data derived from Rows
   */
  const tableData = useMemo(() => {
    return (
      keySelected === 'all'
        ? rows.filter((row) => {
            if (row.title.includes(search)) return row;
          })
        : rows.filter((row) => {
            if (row.status === keySelected && row.title.includes(search))
              return row;
          })
    )
      .sort(sortComparator(sortedBy, sortDirection))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [
    rows,
    sortedBy,
    sortDirection,
    keySelected,
    page,
    rowsPerPage,
    debouncedSearchValue
  ]);

  useEffect(() => {
    setSearchLoading(true);
    const timeoutID = setTimeout(() => {
      setDebouncedSearchValue(search);
      setSearchLoading(false);
    }, 300);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [search]);
  /**
   * Helper function to sort the rows
   */
  const memosortTableByColumn = useCallback(function sortTableByColumn(
    tableColumn: ColumnsOptions
  ) {
    setSortDirection((sortDirection) =>
      sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortedBy(tableColumn);
  },
  []);

  return (
    <>
      <Box sx={{ backgroundColor: '#ffffff' }}>
        <Box paddingY={2} paddingX={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ fontWeight: 'bold' }}>
              My Tickets
            </Typography>

            {rows.length > 0 && (
              <Box>
                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Button
                    onClick={handleClick}
                    sx={{
                      textTransform: 'capitalize',
                      color: '#000',
                      fontWeight: 'bold',
                      display: 'flex',
                      gap: 3
                    }}>
                    {keySelected === 'all' ? 'All Ticket' : keySelected}
                    <Badge
                      color={statusToColor(keySelected as TicketStatusType)}
                      // @ts-ignore
                      badgeContent={menuItems[keySelected]}></Badge>
                    <KeyboardArrowDownRoundedIcon />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}>
                    {Object.keys(menuItems).map((status) => {
                      // @ts-ignore
                      if (menuItems[status] > 0) {
                        return (
                          <MenuItem
                            sx={{
                              paddingLeft: 2,
                              paddingRight: 1,
                              width: '12rem'
                            }}
                            key={status}
                            onClick={() => {
                              handleMenuItemClick(status);
                            }}>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: 'bold'
                                  }}>
                                  {status}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Badge
                                  color={statusToColor(
                                    status as TicketStatusType
                                  )}
                                  //@ts-ignore
                                  badgeContent={menuItems[status]}
                                />
                              </Grid>
                            </Grid>
                          </MenuItem>
                        );
                      }
                    })}
                  </Menu>
                  <SearchInput
                    searchValue={search}
                    setSearchValue={setSearch}></SearchInput>
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>

        <Divider />

        <Box paddingY={4} paddingX={2}>
          {rows.length === 0 ? (
            // If Rows is Empty
            <NoTicketsFound message="Your support tickets or feature requests will appear here." />
          ) : (
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
              <TicketsTable
                data={tableData}
                sortedBy={sortedBy}
                sortDirection={sortDirection}
                sortTableByColumn={memosortTableByColumn}
                searchLoading={searchLoading}
                debouncedSearchValue={debouncedSearchValue}></TicketsTable>
            </Suspense>
          )}
        </Box>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        showFirstButton
        showLastButton
      />
    </>
  );
};

export default TicketsSection;
