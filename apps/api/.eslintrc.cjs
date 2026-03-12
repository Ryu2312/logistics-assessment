module.exports = {
  root: true,
  extends: ['@probo/eslint-config/base', 'plugin:@nestjs/recommended'],
  plugins: ['@nestjs'],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
