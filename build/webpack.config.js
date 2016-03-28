var webpack = require('webpack'),
    NpmInstallPlugin = require('npm-install-webpack-plugin'),
    pathmap = require('./pathmap.js');

var rootDir = pathmap.root,
    buildDir = pathmap.build;

module.exports = {

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
            'angular'
        ],
        app: [
            'index.js'
        ]
    },

    output: {
        path: buildDir,
        filename: '[name].js'
    },
    module: {
        loaders: [

            // load and compile javascript
            { test: /\.js$/, exclude: /node_modules/, loader:"babel" },

            // load css and process less
            { test: /\.css$/, loader: "style!css"},

            // load JSON files and HTML
            { test: /\.json$/, loader: "json" },
            { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

            // load fonts(inline base64 URLs for <=8k)
            { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
            { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},

            // load images (inline base64 URLs for <=8k images)
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },

    plugins: [
        new NpmInstallPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js'})
    ]
};
