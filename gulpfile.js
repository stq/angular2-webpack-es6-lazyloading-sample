'use strict';

import requireDir from 'require-dir';
import gulp from 'gulp';

requireDir('./build/tasks', { recurse: true });
gulp.task('default', [ 'dev' ]);

process.on('uncaughtException', (err) => {
    console.log('A global exception occured:', err);
})