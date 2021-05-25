/**
 * Webpack main configuration file
 */

const path = require('path');
// const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
    movie: path.resolve(environment.paths.source, 'js', 'movie.js'),
    error: path.resolve(environment.paths.source, 'js', 'error.js'),
    register: path.resolve(environment.paths.source, 'js', 'register.js'),
    authorization: path.resolve(environment.paths.source, 'js', 'authorization.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/design/[name].[hash:6].[ext]',
              publicPath: '../',
              limit: environment.limits.images,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash:6].[ext]',
              publicPath: '../',
              limit: environment.limits.fonts,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images', 'content'),
          to: path.resolve(environment.paths.output, 'images', 'content'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'index.html',
      template: path.resolve(environment.paths.source, 'templates', 'index.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['app'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'movie.html',
      template: path.resolve(environment.paths.source, 'templates', 'movie.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['movie'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'error.html',
      template: path.resolve(environment.paths.source, 'templates', 'error.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['error'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'authorization.html',
      template: path.resolve(environment.paths.source, 'templates', 'authorization.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['authorization'],
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'register.html',
      template: path.resolve(environment.paths.source, 'templates', 'register.html'),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
      chunks: ['register'],
    }),
  ],
  target: 'web',
};
