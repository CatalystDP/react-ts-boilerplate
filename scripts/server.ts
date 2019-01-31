import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import devConfig from './webpack.dev.conf';
import projectConfig from './project.config';

new WebpackDevServer(webpack(devConfig), {
  contentBase: projectConfig.outPath,
  hot: true,
  inline: true,
  hotOnly: true,
  historyApiFallback: {
    disableDotRule: true
  },
  // publicPath: `http//localhost:${projectConfig.devServerPort}`,
  stats: 'normal',
  clientLogLevel: 'warning',
  port: projectConfig.devServerPort
})
  //@ts-ignore
  .listen(projectConfig.devServerPort, '0.0.0.0', (err) => {
    if (err) {
      console.error('[dev-server] errors ', err);
    } else {
      console.log(`[dev-server] listening on port: ${projectConfig.devServerPort}`);
    }
  });
