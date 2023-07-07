export type Search = Record<string, any> | Record<string, any>[];

export type Pagination = { limit: number; offset: number };

export type Query = {
  search: Search;
  pagination: Pagination;
};
