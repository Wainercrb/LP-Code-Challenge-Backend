import { PatinationResponse } from '@/shared/domain/pagination';

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
