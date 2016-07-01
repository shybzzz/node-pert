var gulp = require('gulp');
const COPY_APP_CONFIGS = 'copy:app-configs';

gulp.task(COPY_APP_CONFIGS, [
	require("./copy.public.libs.js"),
	require("./copy.css.assets"),
	require("./copy.images")

], function () {
	return gulp.src('src/application.config.json')
		.pipe(gulp.dest('deploy/server'))
});
module.exports = COPY_APP_CONFIGS;