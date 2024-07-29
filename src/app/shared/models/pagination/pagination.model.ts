export interface Pagination {
  first: number;
  last: number;
  items: number;
  pages: number;
  next: number | null;
  prev: number | null
}
