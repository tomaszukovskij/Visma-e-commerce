var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename");


gulp.task('sass', function(){
  return gulp.src('assets/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload())
});

gulp.task('compress', function () {
  return gulp.src('assets/js/*.js', { sourcemaps: true }) // path to your file
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(rename({ suffix: '-min' }))
  .pipe(gulp.dest('assets/js/min'))
  .pipe(plumber(function (error) {
          gutil.log(error.message);
          this.emit('end');
  }));
});

gulp.task('watch', function(){
  gulp.watch('assets/scss/**/*.scss', gulp.series(['sass']));
//   gulp.watch('assets/js/script.js', gulp.series(['compress']));
  // Other watchers
});