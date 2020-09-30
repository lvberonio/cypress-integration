/* eslint-disable global-require */
const fs = require('fs');
const wp = require('@cypress/webpack-preprocessor');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../webpack.cypress.config'),
  };

  on('file:preprocessor', wp(options));

  on('task', {
    doesFixtureExist(filePath) {
      return fs.existsSync(filePath);
    },
  });

  return config;
};
