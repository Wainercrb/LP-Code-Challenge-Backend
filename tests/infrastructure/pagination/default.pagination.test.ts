import {
  buildPaginationRequest,
  buildPaginationResponse,
  PatinationResponse,
} from '../../../src/infrastructure/pagination/default.pagination';

describe('Pagination Utilities', () => {
  describe('buildPaginationRequest', () => {
    it('should build pagination request', () => {
      const page = 2;
      const size = 10;
      const expectedOffset = (page - 1) * size;
      const expectedLimit = size;

      const paginationRequest = buildPaginationRequest(page, size);

      expect(paginationRequest.offset).toBe(expectedOffset);
      expect(paginationRequest.limit).toBe(expectedLimit);
    });
  });

  describe('buildPaginationResponse', () => {
    it('should build pagination response', () => {
      const size = 10;
      const count = 25;

      const paginationResponse: PatinationResponse = buildPaginationResponse(size, count);

      expect(paginationResponse.totalPages).toBe(3);
      expect(paginationResponse.totalItems).toBe(count);
    });

    it('should handle zero count', () => {
      const size = 10;
      const count = 0;

      const paginationResponse: PatinationResponse = buildPaginationResponse(size, count);

      expect(paginationResponse.totalPages).toBe(0);
      expect(paginationResponse.totalItems).toBe(count);
    });

    it('should handle count less than size', () => {
      const size = 10;
      const count = 5;

      const paginationResponse: PatinationResponse = buildPaginationResponse(size, count);

      expect(paginationResponse.totalPages).toBe(1);
      expect(paginationResponse.totalItems).toBe(count);
    });
  });
});
