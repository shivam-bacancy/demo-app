import { useCallback, useEffect, useState } from "react";
import { useGetBooksQuery } from "../api/books";
import { GridPaginationModel } from "@mui/x-data-grid";

export const MIN_TEXT_SEARCH = 3;
const WAIT_INTERVAL = 600;

export default function useGetBooksData() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const queryObj = useGetBooksQuery(
    {
      page: paginationModel.page + 1,
      query: debouncedQuery,
      pageSize: paginationModel.pageSize,
    },
    { skip: !debouncedQuery || debouncedQuery.length < MIN_TEXT_SEARCH }
  );

  const handleSearchQueryChange = useCallback((newValue: string) => {
    setQuery(newValue);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPaginationModel((model) => ({ ...model, page: 0 }));
      setDebouncedQuery(query);
    }, WAIT_INTERVAL);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    ...queryObj,
    query,
    paginationModel,
    setPaginationModel,
    handleSearchQueryChange,
  };
}
