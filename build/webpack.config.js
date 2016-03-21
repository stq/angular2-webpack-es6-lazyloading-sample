import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import pathmap from './pathmap.js';

var rootDir = pathmap.root,
    buildDir = pathmap.build;

export default {

    resolve: {

        modules: [
            rootDir,
            'app',
            'node_modules'
        ],

        root: rootDir,

        modulesDirectories: ['app', 'node_modules'],

        alias: {
            'ui.router': 'angular-ui-router/release/angular-ui-router',
            'app.config': 'app/global/config.js'
        }
    },

    entry: {
        vendor: [
            'angular',
            'underscore',
            'ui.router',
            'angular-bootstrap-npm/dist/angular-bootstrap',
            'oclazyload'
        ],
        app: [
            'app.module.js'
        ]
    },

    output: {
        path: buildDir,
        publicPath: '',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'raw' + (production && '!html-minify' || ''),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/, /datagrid/]
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                exclude: [/node_modules/]
            },{
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
                exclude: /node_modules/
            },{
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:  'url-loader',
                exclude: /node_modules/,
                query: {
                    name: 'limit=10000&mimetype=application/font-woff'
                }
            },{
                test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                exclude: /node_modules/
            },{
                test: /\.(png|jpg)$/,
                loader: 'url',
                exclude: /node_modules/,
                query: {
                    name: 'limit=25000'
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
    ]
};
