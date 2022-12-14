require("nock").disableNetConnect();

/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  preset: "ts-jest/presets/default-esm",
  resetMocks: true,
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testRunner: "jest-circus/runner",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        diagnostics: true,
        useESM: true,
      },
    ],
  },
  verbose: true,
};

const processStdoutWrite = process.stdout.write.bind(process.stdout);

process.stdout.write = (string_, encoding, callback) => {
  if (!String(string_).startsWith("::")) {
    return processStdoutWrite(string_, encoding, callback);
  }
};
