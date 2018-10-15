var gulp = require('gulp');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var config = {
    srcDir: './src',
    devDir: './dist',
    jsPattern: '*.js', 
    jsDir: ''
};


gulp.task('js', function () {
    return gulp.src(config.srcDir+'/'+config.jsPattern)   
    .pipe(debug())   
    .pipe(babel({presets: ["env"]}))
    .pipe(uglify({ie8:true,warnings:true}))     
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.devDir));
});

gulp.task('default', ['js']);

