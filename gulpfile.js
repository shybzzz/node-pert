const gulp = require('gulp');
const del = require('del');

gulp.task('clean', function () {
    return del('deploy/**/*');
});

gulp.task('build', [
    require("./gulp.files/compile.public"),
    require("./gulp.files/compile.server"),
    require("./gulp.files/copy.assets")
]);

gulp.task('default', ['build']);