import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import webpackStream from "webpack-stream";
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();


// Обработка JavaScript
export default () => {
  return gulp.src(path.js.src, { sourcemaps: app.isDev })
    .pipe(gp.plumber({
      errorHandler: gp.notify.onError(error => ({
        title: 'JavaScript',
        message: error.message
      }))
    }))
    .pipe(gp.babel(app.babel))
    .pipe(webpackStream(app.webpack))
    .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }));
}