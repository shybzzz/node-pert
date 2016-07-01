var sass = require('gulp-sass');
var gulp = require('gulp');
const SASS = 'compile:public:sass';

gulp.task(SASS, function () {
    return gulp.src('web/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('deploy/public/css'));
});

module.exports = SASS;