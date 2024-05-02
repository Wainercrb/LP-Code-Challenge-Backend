export interface PatinationResponse {
  totalPages: number;
  totalItems: number;
}

export interface PaginationResult<T> extends PatinationResponse {
  rows: T;
}

export enum PaginationEnumOrder {
  asc = 'ASC',
  desc = 'DESC'
}

export interface PaginationProps {
  page: number,
  size: number,
  criteria?: string | undefined,
  column: string;
  direction: string 
}

export const PaginationOrder: [string, ...string[]] = [PaginationEnumOrder.asc, PaginationEnumOrder.desc];
