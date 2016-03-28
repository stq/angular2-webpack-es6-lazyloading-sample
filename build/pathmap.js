/**
 * This file is sensitive to its location - move with care.
 */
var path = require('path'),
    root = path.join(path.resolve(__dirname), '..');
console.log('Root directory', root);
module.exports = {
    root: root,
    build: path.join(root, 'public'),
    dist: {
        from: path.join(root, 'public/**/*.*'),
        to: path.join(root, 'dist')
    }
};