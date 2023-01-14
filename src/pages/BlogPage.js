import { Helmet } from 'react-helmet-async';
// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from '@mui/material';
// components
import { filter } from 'lodash';
import { useState } from 'react';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

function favoriteComparater(a, b) {
  if (b.favorite < a.favorite) {
    return -1;
  }
  if (b.favorite < a.favorite) {
    return 1;
  }
  return 0;
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(orderBy) {
  console.log(orderBy);
  return orderBy === 'latest'
    ? (a, b) => descendingComparator(a, b, 'createdAt')
    : orderBy === 'oldest'
    ? (a, b) => -descendingComparator(a, b, 'createdAt')
    : (a, b) => favoriteComparater(a, b);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BlogPage({ pName }) {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };
  //
  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleRequestSort = (property) => {
    setOrderBy(property);
  };

  const [orderBy, setOrderBy] = useState('latest');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - POSTS.length) : 0;
  const filteredUsers = applySortFilter(POSTS, getComparator(orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  return (
    <>
      <Helmet>
        <title> Dashboard: {pName} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {pName}
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch filterName={filterName} onFilterName={handleFilterByName} />
          <BlogPostsSort options={SORT_OPTIONS} onSort={handleRequestSort} selected={orderBy} />
        </Stack>

        <Grid container spacing={3}>
          {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        {isNotFound && (
          <Paper
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" paragraph>
              Not found
            </Typography>

            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{filterName}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={POSTS.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
}
