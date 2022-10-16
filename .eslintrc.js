module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    settings: {},
    rules: {
        'require-jsdoc': 0,
        'valid-jsdoc': 0,
        'prettier/prettier': [
            'error',
            { endOfLine: 'auto' },
            { usePrettierrc: true },
        ],
    },
};
