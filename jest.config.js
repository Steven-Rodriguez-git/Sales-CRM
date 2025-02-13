// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", 
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", 
  },
  testEnvironment: "jsdom", 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
};

module.exports = createJestConfig(customJestConfig);
