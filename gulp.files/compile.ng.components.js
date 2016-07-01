var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var tscConfig = require('./config/tsc.config.json');
var inlineNg2Template = require('gulp-inline-ng2-template');
var componentConfigs = require("./config/components.json");

var COMPILE_COMPONENTS = "compile:public:components";
var sourcePath = 'web/';
var targetPath = 'deploy/public/app/';

var compileNamespace = function (namespace) {
    var namespacePath = sourcePath + namespace;
    console.log(namespacePath);
    return gulp
        .src(namespacePath + '/*.ts')
        .pipe(inlineNg2Template({base: namespacePath}))
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(targetPath + namespace));
};

var tasks = [];
componentConfigs.namespaces.forEach(function (namespace) {
    var task = COMPILE_COMPONENTS + ":" + namespace;
    tasks.push(task);
    gulp.task(task, function () {
        return compileNamespace(namespace);
    });
});

console.log(componentConfigs, tasks);

gulp.task(COMPILE_COMPONENTS, tasks);

module.exports = COMPILE_COMPONENTS;

