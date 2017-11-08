var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build-src', () => {
  return gulp.src('src/*')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .on("error", function (err) {
      console.log('');
      console.log(err.message);
      console.log('' + err.codeFrame);
      this.emit('end');
    })
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*'], ['build-src']);
});

gulp.task('default', ['build-src', 'watch']);