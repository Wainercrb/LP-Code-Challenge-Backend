/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // paths config
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/domain/entities/', '<rootDir>/src/infrastructure/database'],

  // setup test
  setupFilesAfterEnv: ['<rootDir>/tests/shared/infra/setup-tests.ts'],
};
