import { Pagination } from "./pagination.model";

export interface PaginatedResponse<T> extends Pagination {
  data: T[];
}
