import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import baseConfig from './webpack.base';
import * as reactHotLoader from 'react-hot-loader';
import * as path from 'path';
import projectConfig from './project.config';

let devConfig: webpack.Configuration = webpackMerge(baseConfig, {
  entry: {
    app: [
      `webpack-dev-server/client?http://0.0.0.0:${projectConfig.devServerPort}`,
      'webpack/hot/only-dev-server',
      path.join(projectConfig.sourcePath, 'main.tsx')
    ]
  },
  output:{
    publicPath: '../'
  },
  mode: 'development',
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
});
export default devConfig;
