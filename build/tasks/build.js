import gulp from 'gulp';
import pathmap from '../pathmap.js';
import latestTag from 'git-latest-tag';
import path from 'path';
import _ from 'lodash';
import webpackConfig from '../webpack.config.js';
import webpack from 'webpack';

gulp.task("build", [], (cb) => {
    webpack(webpackConfig, (err, stats) => {
        if (err) throw err;
        console.log("[webpack]", stats.toString({}));
        cb();
    });
});

gulp.task('dist', [ 'build' ], (cb) => {
    latestTag((err, tag) => {
        if (err) {
            console.err(err);
            cb();
            return;
        }
        gulp.src(pathmap.dist.from)
            .pipe(gulp.dest(path.join(pathmap.dist.to, tag)))
            .on('end', cb);
    })
});