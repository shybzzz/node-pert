var gulp = require('gulp');

const COPY_ANGULAR2 = 'copy:assets:libs:angular2';
const COPY_D3 = 'copy:assets:libs:d3';
const COPY_CHARTS = "copy:assets:libs:charts";
const COPY_PRIME_NG_ASSETS = 'copy:assets:libs:primeng-assets';
const COPY_PRIME_NG = 'copy:assets:libs:primeng';
const COPY_ANGULAR2_IN_MEMORY_API = "copy:assets:libs:angular2-in-memory-web-api";
const COPY_RXJS = "copy:assets:libs:rxjs";
const COPY_SYSTEM_JS = 'copy:assets:libs:systemjs';
const COPY_ES6_SHIM = "copy:assets:libs:es6-shim";
const COPY_LIBS_ZONE = "copy:assets:libs:zone";
const COPY_REFLECT_METADATA = "copy:assets:libs:reflect-metadata";
const COPY_VIS = "copy:assets:libs:vis";
const COPY_PUBLIC_LIBS = 'copy:assets:libs';

gulp.task(COPY_PUBLIC_LIBS, [
    COPY_PRIME_NG,
    COPY_D3,
    COPY_ANGULAR2,
    COPY_ANGULAR2_IN_MEMORY_API,
    COPY_RXJS,
    COPY_SYSTEM_JS,
    COPY_ES6_SHIM,
    COPY_LIBS_ZONE,
    COPY_REFLECT_METADATA,
    COPY_CHARTS,
    COPY_VIS
]);

gulp.task(COPY_CHARTS, function () {
    return gulp.src([
            'node_modules/chart.js/dist/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/chart.js'))
});

gulp.task(COPY_VIS, function () {
    return gulp.src([
            'node_modules/vis/dist/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/vis'))
});

gulp.task(COPY_ANGULAR2_IN_MEMORY_API, function () {
    return gulp.src([
            'node_modules/angular2-in-memory-web-api/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/angular2-in-memory-web-api'))
});

gulp.task(COPY_ES6_SHIM, function () {
    return gulp.src([
            'node_modules/es6-shim/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/es6-shim'))
});

gulp.task(COPY_REFLECT_METADATA, function () {
    return gulp.src([
            'node_modules/reflect-metadata/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/reflect-metadata'))
});

gulp.task(COPY_RXJS, function () {
    return gulp.src([
            'node_modules/rxjs/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/rxjs'))
});

gulp.task(COPY_SYSTEM_JS, function () {
    return gulp.src([
            'node_modules/systemjs/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/systemjs'))
});

gulp.task(COPY_LIBS_ZONE, function () {
    return gulp.src([
            'node_modules/zone.js/dist/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/zone.js'))
});

gulp.task(COPY_D3, function () {
    return gulp.src([
            'node_modules/d3/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/d3'))
});

gulp.task(COPY_PRIME_NG_ASSETS, function () {
    return gulp.src([
            'node_modules/primeui/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/primeui'))
});

gulp.task(COPY_PRIME_NG, [COPY_PRIME_NG_ASSETS], function () {
    return gulp.src([
            'node_modules/primeng/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/primeng'))
});

gulp.task(COPY_ANGULAR2, function () {
    return gulp.src([
            'node_modules/@angular/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/@angular'))
});

module.exports = COPY_PUBLIC_LIBS;