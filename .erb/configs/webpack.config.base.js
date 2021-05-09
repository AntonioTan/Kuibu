/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-03-18 12:35:50
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-05-06 11:31:09
 */
/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import {
  dependencies as externals
} from '../../src/package.json';

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      // {
      //   test: /gantt-task-react[\\\/]dist[\\\/]index\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ],
  },

  output: {
    path: path.join(__dirname, '../../src'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '../src'), 'node_modules'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
