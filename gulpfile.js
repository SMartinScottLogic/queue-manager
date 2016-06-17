'use strict'

var gulp = require('gulp')
var ts = require('gulp-typescript')
var babel = require('gulp-babel')
var rename = require('gulp-rename')
var browserify = require('gulp-browserify')

const APP_PATH='app2'

var babel_options = {
    'presets': ['es2015'],
    'plugins': ['transform-runtime']
}

gulp.task('tsc', function() {
    var tsProject = ts.createProject('tsconfig.json', {rootDir: `${APP_PATH}/scripts`})
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(babel(babel_options))
        .pipe(rename(function(path) {
            path.extname = '.js'
        }))
        .pipe(gulp.dest(`./${APP_PATH}/dist`))
})

gulp.task('babel', function() {
    return gulp.src(`${APP_PATH}/scripts/**/*.js`)
        .pipe(babel(babel_options))
        .pipe(rename(function(path){
            path.extname = '.js'
        }))
        .pipe(gulp.dest(`./${APP_PATH}/dist`))
})

gulp.task('bundle', ['tsc', 'babel'], function() {
    return gulp.src(`./${APP_PATH}/dist/app.js`, {read:false})
        .pipe(browserify({debug:true}))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(`./${APP_PATH}`))
})

gulp.task('default', ['bundle'])
