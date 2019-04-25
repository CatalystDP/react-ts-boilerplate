let projectConfig = require('./scripts/project.config').default;
let config = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime']
};
if (!projectConfig.isProduction) {
  config.plugins.push('react-hot-loader/babel');
}
module.exports = config;
