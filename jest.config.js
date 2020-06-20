module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/test/__setup__/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/__setup__/setupTests.ts'],
  testMatch: null,
  testRegex: '/test/.*?\\.(test|spec)\\.tsx?$',
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
