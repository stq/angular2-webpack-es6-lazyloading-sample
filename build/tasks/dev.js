import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import webpackConfig from '../webpack.config.js';
import WebpackDevServer from 'webpack-dev-server';
import http from 'http';
import _ from 'lodash';
import proxySettings from './../proxy-settings.js';
import pathmap from './../pathmap.js';

var webpackDevserverConfig = {
    contentBase: pathmap.root,
    proxy: {
        '/api/*': {
            target: proxySettings.settings.apiHost
        },
        '/cdn/*': {
            target: proxySettings.settings.componentHosts.cdn,
            rewrite: function(req) {
                if( proxySettings.isLocalhost(proxySettings.settings.componentHosts.cdn) ) {
                    req.url = req.url.replace(/^\/cdn/, '');
                }
            }
        }
    }
};

gulp.task("dev", () => {
    var compiler = webpack(webpackConfig),
        server = new WebpackDevServer(compiler, webpackDevserverConfig);
    server.listen(8123, "localhost", (err) => { if (err) throw err; });
});