interface TypePaginationQuery {
  sortBy?: string;
  sortType?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export default TypePaginationQuery;
