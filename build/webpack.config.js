var webpack = require('webpack'),
    pathmap = require('./pathmap.js');

var rootDir = pathmap.root,
    buildDir = pathmap.build;

module.exports = {

    resolve: {
        modules: [
            rootDir,
            'app',
            'node_modules'
        ]
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
            { test: /\.js$/, exclude: /node_modules/, loader:"babel" },
            { test: /\.css$/, loader: "style!css"},
            { test: /\.json$/, loader: "json" },
            { test: /\.html$/, exclude: /node_modules/, loader:"raw" },
            { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
            { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js'})
    ]
};
