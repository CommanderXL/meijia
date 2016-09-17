/**
 * Created by XRene on 16/9/9.
 */


var gulp = require('gulp'),
    less = require('gulp-less');


gulp.task('less', function () {
    gulp.watch('./less/*.less', function () {
        gulp.src('./less/*.less')
            .pipe(less())
            .pipe(gulp.dest('./css'));
    });
});

gulp.task('default', ['less']);
