const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfigSrc = require('./tsdconfig.commonjs.json');
//const tscConfig = require('./tsconfig.system.json');
const tscConfig = tscConfigSrc;
const sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var inlineNg2Template = require('gulp-inline-ng2-template');

const COPY_ANGULAR2 = 'copy:angular2';
const COPY_D3 = 'copy:d3';
const COPY_CHARTS="copy:charts";
const COPY_PRIME_NG_ASSETS = 'copy:primeng-assets';
const COPY_PRIME_NG = 'copy:primeng';
const COPY_ANGULAR2_IN_MEMORY_API = "copy:angular2-in-memory-web-api";
const COPY_RXJS = "copy:rxjs";
const COPY_SYSTEM_JS = 'copy:systemjs';
const COPY_ES6_SHIM = "copy:libs:es6-shim";
const COPY_LIBS_ZONE = "copy:libs:zone";
const COPY_REFLECT_METADATA = "copy:reflect-metadata";
const COPY_VIS = "copy:vis";


gulp.task('copy:public:libs', [
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

gulp.task('clean', function () {
    return del('deploy/**/*');
});

gulp.task('compile:public', ['sass', 'compile:shared:public'], function () {
    return gulp
        .src('web/**/*.ts')
        .pipe(inlineNg2Template({base: '/web/Components'}))
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/public/app'));
});

gulp.task('compile:shared:public', function () {
    return gulp
        .src('shared/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/public/shared'));
});

gulp.task('sass', function () {
    return gulp.src('web/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('deploy/public/css'));
});

gulp.task('compile:server', ["compile:shared:server"], function () {
    return gulp
        .src('src/**/*.ts')
        .pipe(typescript(tscConfigSrc.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/server'));
});

gulp.task('compile:shared:server', function () {
    return gulp
        .src('shared/**/*.ts')
        .pipe(typescript(tscConfigSrc.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('deploy/shared'));
});

gulp.task("compile:shared", ['compile:shared:server', 'compile:shared:public']);

gulp.task(COPY_ANGULAR2, function () {
    return gulp.src([
            'node_modules/@angular/**/*'
        ])
        .pipe(gulp.dest('deploy/public/js/lib/@angular'))
});

gulp.task(COPY_CHARTS, function() {
    return gulp.src([
        'node_modules/chart.js/dist/**/*'
    ])
        .pipe(gulp.dest('deploy/public/js/lib/chart.js'))
});

gulp.task(COPY_VIS, function() {
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

gulp.task(COPY_PRIME_NG_ASSETS, ['copy:primeng-css'], function () {
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

gulp.task('copy:primeng-css-theme', function () {
    return gulp.src([
            'node_modules/primeui/themes/bootstrap/**/*'
        ])
        .pipe(gulp.dest('deploy/public/css/primeng'))
});

gulp.task('copy:primeng-css', ['copy:primeng-css-theme'], function () {
    return gulp.src([
            'node_modules/primeui/primeui-ng-all.min.css'
        ])
        .pipe(gulp.dest('deploy/public/css/primeng'))
});

gulp.task('copy:font-awesome', ['copy:font-awesome-fonts'], function () {
    return gulp.src([
            'node_modules/font-awesome/css/font-awesome.min.css'
        ])
        .pipe(gulp.dest('deploy/public/css/font-awesome/css'))
});

gulp.task('copy:font-awesome-fonts', function () {
    return gulp.src([
            'node_modules/font-awesome/fonts/**'
        ])
        .pipe(gulp.dest('deploy/public/css/font-awesome/fonts'))
});

gulp.task('copy:bootstrap-css', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/**/*'
        ])
        .pipe(gulp.dest('deploy/public/css/'))
});

gulp.task('copy:bootstrap-fonts', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/fonts/**/*'
        ])
        .pipe(gulp.dest('deploy/public/fonts/'))
});


// copy static assets - i.e. non TypeScript compiled source
const COPY_ASSETS = 'copy:assets';
const COPY_IMAGES = "copy:images";
gulp.task(COPY_ASSETS, ['copy:public:libs', 'copy:font-awesome', 'copy:bootstrap-css', 'copy:bootstrap-fonts', COPY_IMAGES], function () {
    return gulp.src([
            'web/index.html',
            'web/systemjs.config.js'
        ])
        .pipe(gulp.dest('deploy/public'))
});

gulp.task(COPY_IMAGES, function () {
    return gulp.src([
            "web/images/**/*"
        ])
        .pipe(gulp.dest('deploy/public/images'))
});

gulp.task('build', ['compile:public', 'compile:server', COPY_ASSETS]);
gulp.task('default', ['build']);