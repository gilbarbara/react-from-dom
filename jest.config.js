module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  setupFiles: ['<rootDir>/test/__setup__/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/__setup__/setupTests.ts'],
  testRegex: '/test/.*?\\.(test|spec)\\.tsx?$',
  testURL: 'http://localhost:1337/',
  transform: {
    // '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
