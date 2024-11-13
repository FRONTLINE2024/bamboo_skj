module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['fix', 'feature', 'refactor', 'chore', 'release'],
    ],
  },
};
