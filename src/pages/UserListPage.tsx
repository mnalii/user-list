import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Table,
  TableContainer,
  TableBody,
  Container,
  Card,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from '../redux/store';
import { deleteUser } from '../redux/slices/user';

import User from '../types/user';
import useTable from '../hooks/useTable';
import { getComparator, emptyRows } from '../helper/sorting';

import {
  TableHeadCustom,
  TableRowCustom,
  TableEmptyRows,
  TableNoData,
  TablePaginationCustom,
} from '../components/table';

const TABLE_HEAD = [
  { id: 'username', label: 'Username', align: 'left' },
  { id: 'firstname', label: 'First Name', align: 'left' },
  { id: 'lastname', label: 'Last Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'passwordExpiredDate', label: 'Password Expired', align: 'left' },
  { id: 'groupAccess', label: 'Group Access', align: 'left' },
  { id: '' },
];

export default function UserListPage() {
  const [searchQueryString, setSearchQueryString] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const userList = applySearch({
    userArr: users,
    searchQueryString: searchQueryString,
    comparator: getComparator(order, orderBy),
  });

  const dataInPage = userList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isSearching = searchQueryString !== '';
  const isNotFound = !userList.length && !!searchQueryString;

  const handleSearchUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearchQueryString(event.target.value);
  };

  const handleEditUser = (id: string) => {
    navigate(`/user/${id}`);
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  return (
    <Container maxWidth='lg'>
      <TextField
        fullWidth
        value={searchQueryString}
        onChange={handleSearchUserName}
        placeholder='Search...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Card>
        <TableContainer>
          <Table>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onSort={onSort}
            />

            <TableBody>
              {userList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRowCustom
                    key={user.id}
                    row={user}
                    onDeleteRow={() => handleDeleteUser(user.id)}
                    onEditRow={() => handleEditUser(user.id)}
                  />
                ))}

              {users && (
                <TableEmptyRows
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />
              )}

              <TableNoData isNotFound={isNotFound} title='No data' />
            </TableBody>
          </Table>
        </TableContainer>

        <TablePaginationCustom
          count={userList.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

function applySearch({
  userArr,
  comparator,
  searchQueryString,
}: {
  userArr: User[];
  comparator: (a: any, b: any) => number;
  searchQueryString: string;
}) {
  const stabilizedData = userArr.map((el, index) => [el, index] as const);

  stabilizedData.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    console.log({ order });

    if (order !== 0) return order;
    return a[1] - b[1];
  });

  userArr = stabilizedData.map((el) => el[0]);

  if (searchQueryString) {
    userArr = userArr.filter(
      (user) =>
        user.username.toLowerCase().indexOf(searchQueryString.toLowerCase()) !==
        -1
    );
  }

  return userArr;
}
