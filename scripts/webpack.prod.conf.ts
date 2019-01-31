import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import baseConfig from './webpack.base';
import * as path from 'path';
import projectConfig from './project.config';
import UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let devConfig: webpack.Configuration = webpackMerge(baseConfig, {
  entry: {
    app: path.join(projectConfig.sourcePath, 'main.tsx')
  },
  output: {
    publicPath: '../'
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          keep_fnames: true,
          keep_classnames: true
        }
      })
    ]
  }
});
export default devConfig;
