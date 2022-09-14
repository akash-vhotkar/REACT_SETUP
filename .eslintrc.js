module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@babel/eslint-parser',
    extends: ['plugin:react/recommended', 'standard', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'space-before-function-paren': 'off',
        'prettier/prettier': ['error'],
        semi: ['error', 'always'],
        quotes: 'off',
        'object-curly-spacing': 'off',
    },
};
