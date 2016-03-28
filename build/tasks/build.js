var gulp = require('gulp'),
    pathmap = require('./../pathmap.js');

gulp.task("build", [], (cb) => {
    require('webpack')(require('./../webpack.config.js'), (err, stats) => {
        if (err) throw err;
        console.log("[webpack]", stats.toString({}));
        cb();
    });
});

gulp.task('dist', [ 'build' ], (cb) => {
    require('git-latest-tag')((err, tag) => {
        if (err) {
            console.err(err);
            cb();
            return;
        }
        gulp.src(pathmap.dist.from)
            .pipe(gulp.dest(require('path').join(pathmap.dist.to, tag)))
            .on('end', cb);
    })
});