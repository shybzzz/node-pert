var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var tscConfig = require('./config/tsc.config.json');

const COMPILE_SHARED_SERVER = 'compile:server:shared';
const COMPILE_SERVER = 'compile:server';
gulp.task(COMPILE_SERVER, [COMPILE_SHARED_SERVER], function () {
    return gulp
        .src('src/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/server'));
});

gulp.task(COMPILE_SHARED_SERVER, function () {
    return gulp
        .src('shared/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/shared'));
});

module.exports = COMPILE_SERVER;
