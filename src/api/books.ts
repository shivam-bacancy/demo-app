import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Book } from "./type";

export const booksApi = createApi({
  reducerPath: "booksApi",
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/" }),
  endpoints: (builder) => ({
    getBooks: builder.query<
      { books: Book[]; total: number; query: string },
      Partial<{ query: string; pageSize: number; page: number }>
    >({
      query: ({ query = "", page = 1, pageSize = 10 }) => ({
        url: `search.json`,
        params: {
          page,
          q: query,
          limit: pageSize,
          fields:
            "title,author_name,author_name,ratings_average,first_publish_year,key",
        },
      }),
      transformResponse: (response: ApiResponse) => {
        return {
          books: response.docs,
          total: response.numFound,
          query: response.q,
        };
      },
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
