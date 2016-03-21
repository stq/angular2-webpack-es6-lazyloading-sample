/**
 * This file is sensitive to its location - move with care.
 */
import path from 'path';

var root = path.join(path.resolve(__dirname), '..');

console.log('Root directory', root);

export default {
    root: root,
    build: path.join(root, 'public'),
    dist: {
        from: path.join(root, 'public/**/*.*'),
        to: path.join(root, 'dist')
    }
};