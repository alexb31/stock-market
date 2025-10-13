import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.[tj]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default async () => ({
  ...(await createJestConfig(customJestConfig)()),
});
