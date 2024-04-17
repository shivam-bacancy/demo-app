export type Book = {
  title: string;
  key: string;
  first_publish_year: string;
  author_name: string[];
  ratings_average: number;
};

export type ApiResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
  num_found: number;
  q: string;
  offset?: number | null;
};
