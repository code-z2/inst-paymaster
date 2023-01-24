/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverageFrom: ["!tests/mocks", "src/**/*.{ts,js}", "!src/*.{js,ts}"],
};
