import webpack = require('webpack');

import * as path from 'path';
import tsImportPluginFactory = require('ts-import-plugin');
import projectConfig from './project.config';
var packageJson = require(path.join(projectConfig.parentDir, 'package.json'));
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
let HtmlWebpackDiskPlugin = require('html-webpack-harddisk-plugin');

let baseConfig: webpack.Configuration = {
  context: projectConfig.sourcePath,
  entry: {},
  output: {
    path: projectConfig.outPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.join(projectConfig.parentDir, 'src/app/')
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !projectConfig.isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-hot-loader/babel'] }
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory(/** options */)]
              }) //按需加载配置
            }
          }
        ].filter(Boolean)
      },
      // css
      {
        test: /\.css$/,
        use: [
          projectConfig.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: !projectConfig.isProduction,
              importLoaders: 1,
              localIdentName: projectConfig.isProduction
                ? '[hash:base64:5]'
                : '[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-preset-env')({
                  /* use stage 2 features (defaults) */
                  stage: 2
                }),
                require('postcss-reporter')(),
                require('postcss-browser-reporter')({
                  disabled: projectConfig.isProduction
                })
              ]
            }
          }
        ]
      },
      // static assets
      { test: /\.(html|ejs)$/, use: 'ejs-loader' },
      // { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: 'vendor.js',
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name:'runtime'
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      disable: !projectConfig.isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      filename: path.join(projectConfig.outPath, 'views', 'index.html'),
      templateParameters: (compilation: any, assets: any, options: any) => {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options
          }
        };
      },// FIX for variable undefined
      // inject: false
      alwaysWriteToDisk: true,
      minify: projectConfig.isProduction
        ? {
            // minifyJS: true,
            // minifyCSS: true,
            removeComments: true,
            useShortDoctype: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
          }
        : {},
      meta: {
        title: packageJson.name,
        description: packageJson.description,
        keywords: Array.isArray(packageJson.keywords) ? packageJson.keywords.join(',') : undefined
      }
    }),
    new HtmlWebpackDiskPlugin()
  ],
  // https://webpack.js.org/configuration/devtool/
  devtool: projectConfig.isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};

export default baseConfig;
