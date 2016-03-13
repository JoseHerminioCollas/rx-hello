/* gulpfile.js */
var

  // react = require('gulp-react'),  
  // mocha = require('gulp-mocha'),

  concat = require('gulp-concat'), 
  source = require('vinyl-source-stream'),  
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  babelify = require('babelify'),
  gulp  = require('gulp'),
  gutil = require('gulp-util'),
  concat  = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  browserify = require('browserify'),
  // reactify = require('reactify'),
  streamify = require('gulp-streamify');

var input  = {
  'javascript': 'src/goatstone/**/**/*.js',
  'html': 'src/goatstone/index.html'
};

gulp.task('default', ['build', 'watch' ]);

gulp.task('watch', function() {
  gulp.watch(input.javascript, [  'build' ] );  
});

gulp.task('build', [ 'browserifyBundle', 'buildHTML' ] );

gulp.task('buildHTML', function(){
    return gulp.src( input.html )         
        .pipe(gulp.dest('./dist/'));
});

gulp.task('browserifyBundle', function(){
  return browserify( {
      entries: ['./src/goatstone/index.js'],
      debug: true
    } )
    .transform( babelify )
    //.transform(reactify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error') )
    .pipe( source('js/bundle.js') )
    .pipe( buffer() )
    .pipe( sourcemaps.init({loadMaps: true}) )  
    .pipe( sourcemaps.write('./') )  
    .pipe( gulp.dest('./dist') );
});
