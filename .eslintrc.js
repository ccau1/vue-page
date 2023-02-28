module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import-helpers'],
  ignorePatterns: ['.eslintrc.js', 'src/generated'],
  rules: {
    'prettier/prettier': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/no-unused-collection': 'warn',
    'sonarjs/no-empty-collection': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/cognitive-complexity': ['warn', 40],
    'import-helpers/order-imports': [
      'warn',
      {
        groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
