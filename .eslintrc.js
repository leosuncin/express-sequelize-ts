const { createConfig } = require('eslint-config-galex/dist/createConfig');

module.exports = createConfig({
  rules: {
    'new-cap': 'off',
  },
});
