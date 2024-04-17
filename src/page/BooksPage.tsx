import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import useGetBooksData, { MIN_TEXT_SEARCH } from "../services/useGetBooksData";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { Book } from "../api/type";
import PageHeader from "../components/common/PageHeader";
import { Link } from "react-router-dom";

const columns: GridColDef<Book>[] = [
  { field: "title", headerName: "Title", flex: 1.5 },
  { field: "author_name", headerName: "Author", flex: 1 },
  { field: "first_publish_year", headerName: "Published Year", flex: 1 },
  {
    field: "ratings_average",
    headerName: "Ratings",
    sortable: false,
    renderCell: (params) => <Rating readOnly value={params.value} />,
    flex: 1,
  },
];

function BooksPage() {
  const {
    data,
    isLoading,
    isFetching,
    query,
    handleSearchQueryChange,
    paginationModel,
    setPaginationModel,
  } = useGetBooksData();

  return (
    <Box>
      <PageHeader
        title="Books"
        rightElement={
          <Link to={"/user-details"}>
            <Button variant="contained">Go To Form</Button>
          </Link>
        }
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search"
        variant="outlined"
        placeholder="Harry Potter, J.K. Rowling ...."
        InputProps={{
          startAdornment: <SearchIcon color="disabled" />,
        }}
        value={query}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
        helperText={
          query.length > 0 && query.length < MIN_TEXT_SEARCH
            ? "Enter 3 or more letters to search"
            : undefined
        }
        sx={{ pb: 2 }}
      />
      {query.length < MIN_TEXT_SEARCH && !data && (
        <Box textAlign={"center"}>
          <Typography variant="h6" fontStyle={"italic"}>
            <Typography
              variant="h6"
              fontStyle={"italic"}
              fontWeight={600}
              component={"span"}
              mr={1}
            >
              Start typing!
            </Typography>
            Explore endless possibilities in the world of literature.
          </Typography>
        </Box>
      )}
      {data && (
        <Box>
          <Typography variant="subtitle1">
            Showing search results for "
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component={"span"}
              pb={1}
            >
              {data.query}
            </Typography>
            "
          </Typography>
          <DataGrid
            autoHeight
            loading={isLoading || isFetching}
            rowSelection={false}
            columns={columns}
            rows={data.books}
            rowCount={data.total}
            getRowId={(item) => item.key}
            pageSizeOptions={[5, 10, 25]}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Box>
      )}
    </Box>
  );
}

export default BooksPage;
