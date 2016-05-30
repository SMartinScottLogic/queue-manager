var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

var babel_options = {
    "presets": ["es2015"],
    "plugins": ["transform-runtime"]
}

gulp.task('tsc', function() {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(babel(babel_options))
        .pipe(rename(function(path) {
            path.extname = '.js'
        }))
        .pipe(gulp.dest('./app/dist'));
})

gulp.task('babel', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(babel(babel_options))
        .pipe(rename(function(path){
            path.extname = '.js'
        }))
        .pipe(gulp.dest('./app/dist'))
})

gulp.task('bundle', ['tsc', 'babel'], function() {
    return gulp.src('./app/dist/queue.js', {read:false})
        .pipe(browserify({debug:true}))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app'))
})

gulp.task('default', ['bundle']);
