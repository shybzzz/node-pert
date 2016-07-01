var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var tscConfig = require('./config/tsc.config.json');

const COMPILE_PUBLIC = 'compile:public';
const COMPILE_SHARED_PUBLIC = 'compile:public:shared';
const COMPILE_APP = 'compile:public:app';
const COMPILE_SERVICES = "compile:public:app:services";
const COMPILE_PIPES = "compile:public:app:pipes";

gulp.task(COMPILE_SERVICES, function () {
    return gulp.src("web/Services/**/*.ts")
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/public/app/Services'));
});

gulp.task(COMPILE_PIPES, function () {
    return gulp.src("web/Pipes/**/*.ts")
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/public/app/Pipes'));
});

gulp.task(COMPILE_APP, [
    COMPILE_SERVICES,
    COMPILE_PIPES
], function () {
    return gulp.src([
            'web/*.ts'
        ])
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/public/app/'));

});

gulp.task(COMPILE_PUBLIC, [
    require('./compile.sass'),
    require('./compile.ng.components'),
    COMPILE_SHARED_PUBLIC,
    COMPILE_APP
]);

gulp.task(COMPILE_SHARED_PUBLIC, function () {
    return gulp
        .src('shared/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/public/shared'));
});

module.exports = COMPILE_PUBLIC;