import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import fileInclude from "gulp-file-include";
import loadPlugins from "gulp-load-plugins";
const gp = loadPlugins();


// Обработка HTML
export default () => {
  return gulp.src(path.html.src)
    .pipe(gp.plumber({
      errorHandler: gp.notify.onError(error => ({
        title: 'HTML',
        message: error.message
      }))
    }))
    .pipe(fileInclude())
    .pipe(gp.webpHtml())
    .pipe(gp.size({ title: "До сжатия" }))
    .pipe(gp.htmlmin(app.htmlmin))
    .pipe(gp.size({ title: "После сжатия" }))
    .pipe(gulp.dest(path.html.dest));
}