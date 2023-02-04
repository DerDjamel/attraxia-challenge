import {
  Box,
  Button,
  Stack,
  Typography,
  Table,
  Avatar,
  Chip,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Badge,
  Divider,
  TableSortLabel,
  TablePagination,
  Grid,
  CircularProgress
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DateIcon from '../icons/DateIcon';
import FaceIcon from '@mui/icons-material/Face';
import BiotechIcon from '@mui/icons-material/Biotech';
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
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      role: 'Staff'
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

const TicketsTable = () => {
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
        ? rows
        : rows.filter((row) => {
            if (row.status === keySelected) return row;
          })
    )
      .filter((row) => {
        if (row.title.includes(search)) return row;
      })
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
  function sortTableByColumn(tableColumn: ColumnsOptions) {
    setSortDirection((sortDirection) =>
      sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortedBy(tableColumn);
  }

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

        <Box paddingY={4} paddingX={5}>
          {rows.length === 0 ? (
            // If Rows is Empty
            <NoTicketsFound message="Your support tickets or feature requests will appear here." />
          ) : (
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
                  {tableData.length > 0 ? (
                    <Table>
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

                      <TableBody>
                        {tableData?.map((row) => {
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
                                <Stack
                                  direction={'row'}
                                  spacing={3}
                                  justifyContent={'space-between'}
                                  alignItems={'center'}
                                  flexGrow={1}>
                                  <Stack
                                    direction={'row'}
                                    spacing={2}
                                    flexGrow={1}
                                    alignItems={'center'}>
                                    <Avatar
                                      sx={{ width: 32, height: 32 }}
                                      alt="Remy Sharp"
                                      src={row.lastUser.avatar}
                                    />
                                    <Typography>
                                      Last by {row.lastUser.username}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction={'row'}
                                    spacing={3}
                                    justifyContent={'end'}
                                    alignItems={'center'}
                                    flexGrow={1}>
                                    <Stack
                                      direction={'row'}
                                      spacing={3}
                                      justifyContent={'end'}
                                      alignItems={'center'}
                                      flexGrow={1}>
                                      <Badge
                                        badgeContent={row.replies}
                                        sx={{
                                          '.MuiBadge-badge': {
                                            borderRadius: 1,
                                            backgroundColor: '#EDEDED'
                                          }
                                        }}
                                      />
                                      {row.lastUser.role ? (
                                        <Chip
                                          size="small"
                                          icon={<FaceIcon />}
                                          label={
                                            <Typography variant={'button'}>
                                              {row.lastUser.role}
                                            </Typography>
                                          }
                                        />
                                      ) : null}
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
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
            // { tableData.length === 0 ? : <NoTicketsFound searchTerm={debouncedSearchValue} message="Please adjust your search term and try again." />}
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

export default TicketsTable;
