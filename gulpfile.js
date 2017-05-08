const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('lint', () =>
    gulp.src(['**/*.js', '!node_modules/**', '!gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

const excludeList = ['test/from.suite.js'];
gulp.task('mocha', () =>
    gulp.src(['test/*.js', ...excludeList.map(f => '!' + f)], {read: false})
        .pipe(mocha())
);

gulp.task('mocha-separated', ['mocha'], () =>
    gulp.src(excludeList, {read: false})
        .pipe(mocha())
);

gulp.task('default', ['lint', 'mocha', 'mocha-separated']);
