/**
 * Tasks to manage semantic versioning (see http://semver.org/ for details)
 * PATCH: Backwards-compatible bug fixes.
 * MINOR: Backwards-compatible changes.
 * MAJOR: Backward-incompatible changes.
 * IMPORTANT: when pushing to git, use `git push --tags`
 */

import gulp from 'gulp';
import tag from 'gulp-tag-version';
import git from 'gulp-git';
import bump from 'gulp-bump';
import filter from 'gulp-filter';

gulp.task('patch', [], () => {
    return incrementVersion('patch');
});

gulp.task('minor', [], () => {
    return incrementVersion('minor');
});

gulp.task('major', [], () => {
    return incrementVersion('major');
});

function incrementVersion(importance) {
    return gulp.src(['./package.json'])
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit(importance + ' version bump'))
        .pipe(filter('package.json'))
        .pipe(tag());
}