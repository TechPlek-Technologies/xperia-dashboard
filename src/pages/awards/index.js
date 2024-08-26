import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@mui/material';

// third-party
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project-imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TablePagination,
  TableRowSelection
} from 'components/third-party/ReactTable';

import CustomerView from 'sections/apps/customer/CustomerView';

// import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { Add, Edit, Eye, Trash } from 'iconsax-react';
import { ThemeMode } from 'config';
import { getData } from 'utils/clientFunctions';
import Loader from 'components/Loader';
import { useNavigate } from 'react-router';
import AlertCustomerDelete from './AlertCustomerDelete';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, renderRowSubComponent, handleAdd }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'title', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email', 'firstName', 'lastName'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(['age', 'contact', 'visits', 'email', 'status', 'avatar']);
    } else {
      setHiddenColumns(['avatar', 'email', 'firstName', 'lastName']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={2}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button variant="contained" startIcon={<Add />} onClick={handleAdd} size="small">
              Add Award
            </Button>
            <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'customer-list.csv'} />
          </Stack>
        </Stack>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={column} {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell) => (
                      <TableCell key={cell} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  handleAdd: PropTypes.func,
  renderRowSubComponent: PropTypes.any
};

// ==============================|| CUSTOMER - LIST ||============================== //

const AwardsPage = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  // const data = useMemo(() => makeData(200), []);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customerDeleteId, setCustomerDeleteId] = useState('');
  const [delete1, setDelete] = useState(1);
  const navigate = useNavigate();
  console.log(customer);

  const [data, setData] = useState(null);
  const handleAdd = () => {
    navigate('/add-award', { replace: true });
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: ({ getToggleAllPageRowsSelectedProps }) => <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />,
        accessor: 'selection',
        Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        disableSortBy: true
      },
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'Name',
        accessor: 'title',
        Cell: ({ row }) => {
          const { values } = row;

          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.title}</Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Year',
        accessor: 'year'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => {
          const collapseIcon = row.isExpanded ? <Add style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} /> : <Eye />;
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="View"
              >
                <IconButton
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    row.toggleRowExpanded();
                  }}
                >
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="Edit"
              >
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomer(row.values);
                    handleAdd();
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                      opacity: 0.9
                    }
                  }
                }}
                title="Delete"
              >
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    setCustomerDeleteId(row.values.id);
                  }}
                >
                  <Trash />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[Number(row.id)]} />, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/awards/all-awards`);
        setData(newData.data);
        console.log(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [delete1]);

  if (!data) return <Loader />;

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} handleAdd={handleAdd} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
      <AlertCustomerDelete title={customerDeleteId} open={open} handleClose={handleClose} delete1={delete1} setDelete={setDelete} />
      {/* add customer dialog */}
    </MainCard>
  );
};

AwardsPage.propTypes = {
  row: PropTypes.object,
  values: PropTypes.object,
  avatar: PropTypes.object,
  message: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string,
  value: PropTypes.object,
  isExpanded: PropTypes.bool,
  toggleRowExpanded: PropTypes.func,
  getToggleAllPageRowsSelectedProps: PropTypes.func,
  id: PropTypes.number
};

export default AwardsPage;
