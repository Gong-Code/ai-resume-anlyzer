/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { tsconfig: "tsconfig.test.json" },
    ],
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  roots: ["<rootDir>/__tests__"],
  testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"],
};

module.exports = config;
