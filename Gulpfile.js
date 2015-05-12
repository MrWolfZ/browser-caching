var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    merge = require('merge2'),
	replace = require('gulp-replace'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint');

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  target: 'ES5',
  typescript: require('typescript'),
  module: 'commonjs'
});

gulp.task('ts', function() {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(ts(tsProject));

  return merge([
    // Merge the two output streams, so this task is finished when the IO of both operations are done.  
    tsResult.dts
	.pipe(concat('browser-caching.d.ts'))
	.pipe(replace(/import[^;]*;\n/g, ''))
	.pipe(replace(/export.*from[^;]*;\n/g, ''))
	.pipe(replace(/export( default| declare)? (class|enum|interface)/g, '$2'))
	.pipe(replace(/\n*$/g, ''))
	.pipe(replace(/\n/g, '\n    '))
	.pipe(replace(/^/g, 'declare module \'browser-caching\' {\n    '))
	.pipe(replace(/$/g, '\n}'))
	.pipe(gulp.dest('dist')),
    tsResult.js.pipe(gulp.dest('dist'))
  ]);
});

gulp.task('clean', function (cb) {
  var maxRetryCount = 3;
  var retryCount = 0;

  function clean() {
    del(['dist/**'], function (error) {
      if (error && retryCount < maxRetryCount) {
        console.log('Clean failed. Retrying...');
        retryCount += 1;
        clean();
        return;
      }

      cb(error);
    });
  }

  clean();
});

gulp.task('default', ['clean'], function() {
  gulp.start('ts');
});