var gulp = require('gulp');
const COPY_ASSETS = 'copy:assets';

gulp.task(COPY_ASSETS, [
    require("./copy.public.libs.js"),
    require("./copy.css.assets"),
    require("./copy.images"),
    require("./copy.app.configs")

], function () {
    return gulp.src([
            'web/index.html',
            'web/systemjs.config.js'
        ])
        .pipe(gulp.dest('deploy/public'))
});
module.exports = COPY_ASSETS;