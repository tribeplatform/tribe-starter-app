const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    name: 'client',
    entry: ['./client/src/index.tsx'],
    target: 'web',
    devtool: 'cheap-module-source-map',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            configFile: path.join(__dirname, '/client/tsconfig.json'),
          },
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'css-modules-typescript-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@pages': path.resolve(__dirname, 'client/src/pages'),
        '@images': path.resolve(__dirname, 'client/src/images'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client', 'index.html'),
        base: '/',
      }),
    ],
  },
  {
    name: 'server',
    entry: ['./server/src/index.ts'],
    mode: 'development',
    target: 'node',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: path.join(__dirname, '/server/tsconfig.json'),
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'server/src/'),
        '@controllers': path.resolve(__dirname, 'server/src/controllers/'),
        '@utils': path.resolve(__dirname, 'server/src/utils/'),
        '@routes': path.resolve(__dirname, 'server/src/routes/'),
        '@routes': path.resolve(__dirname, 'server/src/routes/'),
        '@config': path.join(__dirname, 'server/src/config/'),
        '@middlewares': path.resolve(__dirname, 'server/src/middlewares/'),
        '@databases': path.resolve(__dirname, 'server/src/databases/'),
        '@exceptions': path.resolve(__dirname, 'server/src/exceptions/'),
      },
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
    externals: [nodeExternals()],
    externalsPresets: { node: true },
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist'),
    },
  },
];
