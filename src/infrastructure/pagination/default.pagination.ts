export interface PatinationResponse {
  totalPages: number;
  totalItems: number;
}

export interface PaginationResult<T> extends PatinationResponse {
  rows: T;
}

export const buildPaginationRequest = (page: number, size: number) => {
  return {
    offset: (page - 1) * size,
    limit: size,
  };
};

export const buildPaginationResponse = (size: number, count: number): PatinationResponse => {
  return {
    totalPages: Math.ceil(count / size),
    totalItems: count,
  };
};
