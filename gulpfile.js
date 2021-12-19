let { src, dest, parallel } = require("gulp");
let minify = require("gulp-minify");
let cleanCSS = require("gulp-clean-css");

function pagesTask() {
  return src("src/*.html").pipe(dest("dist"));
}
function scriptsTask() {
  return src("src/*.js").pipe(minify()).pipe(dest("dist"));
}
function stylesTask() {
  return src("src/*.css").pipe(cleanCSS()).pipe(dest("dist"));
}

exports.default = parallel(pagesTask, scriptsTask, stylesTask);
