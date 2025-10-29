/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/**@returns {Promise<import('jest').Config>} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
};
