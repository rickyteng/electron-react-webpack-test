var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname, 'app');
var SRC_PATH = path.resolve(__dirname, 'src');
var node_modules_path = path.resolve(__dirname, 'node_modules');

module.exports = {
    cache: true,
    target: 'electron',

    devtool: 'source-map',
    entry: {
        renderer: './src/renderer',
    },
    output: {
        path: APP_PATH,
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    module: {
        loaders: [
            {
                test: /\.js|\.jsx?$/,
                loader: 'babel-loader',
                include: [SRC_PATH],
                query: {
                    presets: ['es2015', 'react'],
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new CopyWebpackPlugin([
            { from: path.resolve(SRC_PATH, 'main.js'), to: 'main.js' },
            { from: path.resolve(SRC_PATH, 'index.html'), to: 'index.html' },
            { from: path.resolve(SRC_PATH, 'package.json'), to: 'package.json' },
            { from: path.resolve(node_modules_path, 'react/dist/react.js'), to: 'lib/react.js' },
            { from: path.resolve(node_modules_path, 'react-dom/dist/react-dom.js'), to: 'lib/react-dom.js' }
        ])
    ]
};