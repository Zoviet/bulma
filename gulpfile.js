var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = {
    srcDir: '',
    devDir: './min',
    jsPattern: '*.js', 
    jsDir: ''
};


gulp.task('js', function () {
    return gulp.src(config.jsPattern)      
    .pipe(uglify())     
    .pipe(gulp.dest(config.devDir));
});

gulp.task('default', ['js']);

