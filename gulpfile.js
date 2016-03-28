require('require-dir')('./build/tasks', { recurse: true });
require('gulp').task('default', [ 'dev' ]);

process.on('uncaughtException', (err) => {
    console.log('A global exception occured:', err);
})