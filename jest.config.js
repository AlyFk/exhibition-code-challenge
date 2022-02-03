const nextJest = require('next/jest');

// @ts-ignore
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^gate(.*)$': '<rootDir>/src/gate$1',
    '^test-utils(.*)$': '<rootDir>/src/test-utils$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^mocks(.*)$': '<rootDir>/src/mocks$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
