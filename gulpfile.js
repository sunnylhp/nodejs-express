/**
 * Created by Administrator on 2017/4/10.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    cssmin = require('gulp-cssmin'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    async = require('async'),
    beeper = require('beeper'),
    gulpif = require('gulp-if'),
    reanme = require('gulp-rename'),
    md5Fingerprint = require('md5-fingerprint'),
    rmdir = require('rmdir'),
    makeUrlVersin = require('gulp-make-css-url-version');

var  exec = require('child_process').exec;


//less
gulp.task('less', function () {
    gulp.watch(['public/src/less/**/*.less'],function () {
        var d = new Date();
        console.log('Compiled at：'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
        gulp.src(['public/src/less/**/*.less','!public/src/less/less_modules/**/*'])
            .pipe(less())
            .pipe(gulp.dest('public/src/css'));
    })
})

