/* gulpfile.js */
var
//   react = require('gulp-react'),
  // mocha = require('gulp-mocha'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
//   babelify = require('babelify'),
  gulp  = require('gulp'),
  gutil = require('gulp-util'),
//    concat  = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
//   browserify = require('browserify'),
//   reactify = require('reactify'),
  streamify = require('gulp-streamify')
//   webpack = require('webpack-stream')
var exec = require('child_process').exec

const eslint = require('gulp-eslint')
let indexFile = [   
    'src/goatstone/index.js'
]
var input  = [
//   'javascript': 'src/goatstone/**/**/*.js',
   'src/goatstone/index.js',
   'src/goatstone/index.html'
];

gulp.task('default', ['build', 'watch' ]);
gulp.task('watch', function () {
    gulp.watch(indexFile, ['lint', 'run-index'])
})
gulp.task('lint', function () {
    return gulp
    .src(indexFile)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
    //        .pipe(jshint())
    // .pipe(jshint.reporter('default'))
})
gulp.task('run-index', function () {
    var cmd = 'node /home/goat/projects/rx-hello/src/goatstone/index.js'
    exec(cmd,
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        if (error !== null) {
            console.log(`exec error: ${error}`)
        }
    })
})

gulp.task('build', [ 'buildHTML', 'buildCSS', 'browserifyBundle' ] );
//gulp.task('webpack', function() {
//  return gulp.src('./src/goatstone/index.js')
//    .pipe(webpack( require('./webpack.config.js') ))
//    .pipe(gulp.dest('./serve/public/'));
//});
// gulp.task('browserifyBundle', function(){
//   return browserify( {
//       entries: ['./src/goatstone/index.js'],
//       debug: true
//     } )
//     .transform( babelify )
//     // .transform(reactify)
//     .bundle()
//     .on('error', gutil.log.bind(gutil, 'Browserify Error') )
//     .pipe( source('bundle.js') )
//     .pipe( buffer() )
//     .pipe( sourcemaps.init({loadMaps: true}) )
//     .pipe( sourcemaps.write('./') )
//     .pipe( gulp.dest('./serve/public/js') );
// });

gulp.task('buildHTML', function(){
    return gulp.src(
        [
            './src/goatstone/index.html'
        ] )
        .pipe(gulp.dest('./serve/'));
});
gulp.task('buildCSS', function(){
    return gulp.src(
        [
            './src/goatstone/main.css'
        ] )
        .pipe(gulp.dest('./serve/public/css'));
});
