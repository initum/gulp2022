import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();

import sassCompile from "sass";
const sass = gp.sass(sassCompile)


// Обработка SCSS
export default () => {
	return gulp.src(path.scss.src, { sourcemaps: app.isDev })
		.pipe(gp.plumber({
			errorHandler: gp.notify.onError(error => ({
			title: 'SCSS',
			message: error.message
			}))
		}))
		.pipe(gp.sassGlob())
		.pipe(sass({
			includePaths: require('node-normalize-scss').includePaths
		}))
		.pipe(gp.webpCss())
		.pipe(gp.autoprefixer())
		.pipe(gp.shorthand())
		.pipe(gp.groupCssMediaQueries())
		.pipe(gp.size({ title: 'main.css' }))
		.pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
		.pipe(gp.csso())
		.pipe(gp.rename({ suffix: '.min' }))
		.pipe(gp.size({ title: 'main.min.css' }))
		.pipe(gp.replace('./src/', '/'))
		.pipe(gp.replace('../', '/'))
		.pipe(gp.replace('./', '/'))
		.pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }));
}