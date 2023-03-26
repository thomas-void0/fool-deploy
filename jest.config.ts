// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },

};

export default config;
