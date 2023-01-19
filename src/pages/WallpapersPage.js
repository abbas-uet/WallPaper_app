import { Helmet } from "react-helmet-async";
// @mui
import { useState } from "react";
import { Container, Grid, Paper, Stack, TablePagination, Typography } from "@mui/material";
// components
import { filter } from "lodash";
import PropTypes from "prop-types";
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from "../sections/@dashboard/wallpaper";
// mock
import POSTS from "../_mock/blog";
import { DialogComponent } from "../components/dialog/DialogComponent";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

function favoriteComparater(a, b) {
  if (b.view < a.view) {
    return -1;
  }
  if (b.view < a.view) {
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

WallpapersPage.propTypes = {
  pName: PropTypes.string.isRequired,
};

export default function WallpapersPage({ pName }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - POSTS.length) : 0;
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
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
              handleOpen={handleClickOpen}
              setSelectedId={setSelectedId}
            />
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
      <DialogComponent open={open} handleClose={handleClose} data={POSTS.find((o) => o.id === selectedId)} />
    </>
  );
}
