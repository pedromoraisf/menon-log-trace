/* eslint-disable no-undef */
/* eslint-disable quotes */
module.exports = {
  roots: ["./src"],
  collectCoverageFrom: ["./src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1",
    "@data/(.*)": "<rootDir>/src/data/$1",
    "@domain/(.*)": "<rootDir>/domain/$1",
    "@infra/(.*)": "<rootDir>/infra/$1",
    "@main/(.*)": "<rootDir>/main/$1",
    "@presentation/(.*)": "<rootDir>/presentation/$1",
    "@utils/(.*)": "<rootDir>/utils/$1",
  },
};
