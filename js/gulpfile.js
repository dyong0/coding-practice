const gulp = require('gulp');
const eslint = require('gulp-eslint');

const mocha = require('gulp-mocha');
const babel = require('babel-register');

const src = ['*/**/*.js','!node_modules/**'];
const testSrc = ['*/**/test.js', '*/**/*.test.js','!node_modules/**'];

gulp.task('lint', () => {
	return gulp.src(src)
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('test', () => { 
	return gulp.src(testSrc)
	.pipe(mocha({compilers : {js:babel}, reporter: 'nyan'}));
});

gulp.task('watch', () => {
	gulp.watch(src, ['lint', 'test']);
});
