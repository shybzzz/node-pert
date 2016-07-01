var gulp = require('gulp');
const COPY_IMAGES = "copy:assets:images";
gulp.task(COPY_IMAGES, function () {
    return gulp.src([
            "web/images/**/*"
        ])
        .pipe(gulp.dest('deploy/public/images'))
});

module.exports = COPY_IMAGES;