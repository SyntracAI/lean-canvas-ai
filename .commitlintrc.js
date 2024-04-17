const {
  utils: {getProjects},
} = require('@commitlint/config-nx-scopes');

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    'scope-enum': async (ctx) => [
      2,
      'always',
      [
        ...(await getProjects(
          ctx,
          ({tags}) => {
            if (!tags) return false;
            return !tags.includes('stage:end-of-life')
          }
        )),
        'root',
        'tools',
        'rigs-packages'
      ],
    ],
  },
};
