var gulp = require('gulp'), 
    sass = require('gulp-sass'), 
    autoprefix = require('gulp-autoprefixer'),
    notify = require('gulp-notify');

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components'
};

// compile sass
gulp.task('sass', function() {
  return gulp.src(config.sassPath + '/styles.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        config.sassPath,
        config.bowerDir + '/bootstrap/scss',
        config.bowerDir + '/font-awesome/scss',
      ]
    }))
    .on('error', notify.onError(function(error){
      return 'Error: ' + error.message;
    }))
    .pipe(autoprefix('last 2 version'))
    .pipe(gulp.dest('./public/css'));
});

// watch for changed sass files
gulp.task('sass:watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

// defualt task
gulp.task('default', ['sass', 'sass:watch']);
