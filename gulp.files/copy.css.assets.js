var gulp = require('gulp');
const COPY_PRIME_NG_CSS_THEME = 'copy:assets:css:primeng-css-theme';
const COPY_PRIME_NG_CSS = 'copy:assets:css:primeng-css';
const COPY_FONT_AWESOME = 'copy:assets:css:font-awesome';
const COPY_FONT_AWESOME_FONTS = 'copy:assets:css:font-awesome-fonts';
const COPY_BOOTSTRAP_CSS = 'copy:assets:css:bootstrap-css';
const COPY_BOOTSTRAP_FONTS = 'copy:assets:css:bootstrap-fonts';
const COPY_CSS_ASSETS = 'copy:assets:css';

gulp.task(COPY_PRIME_NG_CSS_THEME, function () {
    return gulp.src([
            'node_modules/primeui/themes/bootstrap/**/*'
        ])
        .pipe(gulp.dest('deploy/public/css/primeng'))
});

gulp.task(COPY_PRIME_NG_CSS, [COPY_PRIME_NG_CSS_THEME], function () {
    return gulp.src([
            'node_modules/primeui/primeui-ng-all.min.css'
        ])
        .pipe(gulp.dest('deploy/public/css/primeng'))
});

gulp.task(COPY_FONT_AWESOME, [COPY_FONT_AWESOME_FONTS], function () {
    return gulp.src([
            'node_modules/font-awesome/css/font-awesome.min.css'
        ])
        .pipe(gulp.dest('deploy/public/css/font-awesome/css'))
});

gulp.task(COPY_FONT_AWESOME_FONTS, function () {
    return gulp.src([
            'node_modules/font-awesome/fonts/**'
        ])
        .pipe(gulp.dest('deploy/public/css/font-awesome/fonts'))
});

gulp.task(COPY_BOOTSTRAP_CSS, function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/**/*'
        ])
        .pipe(gulp.dest('deploy/public/css/'))
});

gulp.task(COPY_BOOTSTRAP_FONTS, function () {
    return gulp.src([
            'node_modules/bootstrap/dist/fonts/**/*'
        ])
        .pipe(gulp.dest('deploy/public/fonts/'))
});

gulp.task(COPY_CSS_ASSETS, [
    COPY_FONT_AWESOME,
    COPY_BOOTSTRAP_CSS,
    COPY_BOOTSTRAP_FONTS,
    COPY_PRIME_NG_CSS
]);

module.exports = COPY_CSS_ASSETS;