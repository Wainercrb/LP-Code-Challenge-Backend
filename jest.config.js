/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/domain/entities/" ,
    "<rootDir>/src/infrastructure/database"
  ]
};
