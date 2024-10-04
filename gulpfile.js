const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();
const gulpModifier = require("gulp-modifier");
const concat = require("gulp-concat-process");

function buildJS() {
  return gulp
    .src([
      "./src/ts/config.ts",
      "./src/ts/utils.ts",
      "./src/ts/dom.ts",
      "./src/ts/JSSelect.ts",
    ])
    .pipe(
      concat("all.ts", function (contents, file) {
        let newContents =
          `//#region ${file.stem}\n` +
          contents
            .toString()
            .replace(
              /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
              "\n"
            )
            .replace(/export default JSSelect;/, "")
            .replace(/export /g, "")
            .replace(/function JSSelect/, "export function JSSelect") +
          `//#endregion ${file.stem}\n`;
        return newContents.replace(/\n{3,}/, "\n").replace(/\n{3,}/, "\n");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        plugins: [
          [
            "@babel/plugin-transform-modules-umd",
            {
              globals: {
                all: "JSSelect",
              },
              exactGlobals: true,
            },
          ],
        ],
      })
    )
    .pipe(
      gulpModifier(function (contents, path) {
        let newContents = contents.replace(
          "global.JSSelect = mod.exports",
          "global.JSSelect = mod.exports.JSSelect"
        );
        return newContents.trim();
      })
    )
    .pipe(rename({ basename: "JSSelect" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
}

function buildLocales() {
  return gulp
    .src("./src/ts/lang/*.ts")
    .pipe(
      gulpModifier(function (contents, path) {
        let newContents = contents.replace(
          /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
          ""
        );
        return newContents.trim();
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js/lang"));
}

function miniJS() {
  return gulp
    .src("./dist/js/JSSelect.js")
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
}

function miniLocales() {
  return gulp
    .src(["./dist/js/lang/*.js", "!./dist/js/lang/*.min.js"])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js/lang"));
}

function buildCSS() {
  return gulp
    .src("./src/sass/JSSelect.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
}

function postCSS() {
  const contextOptions = { nano: false };
  return gulp
    .src("./dist/css/JSSelect.css")
    .pipe(postcss(contextOptions))
    .pipe(gulp.dest("./dist/css"));
}

function miniCSS() {
  const contextOptions = { nano: true };
  return gulp
    .src("./dist/css/JSSelect.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(contextOptions))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
}

function server(done) {
  browserSync.init({
    server: {
      baseDir: "./site",
      routes: { "/css": "./dist/css", "/js": "./dist/js" },
    },
    open: false,
    cors: true,
    files: [
      "./site/index.html",
      "./site/index.js",
      "./dist/css/JSSelect.css",
      "./dist/js/JSSelect.js",
    ],
  });
}

function watch() {
  gulp.watch(["./src/ts/*.ts"], buildJS);
  gulp.watch("./src/ts/lang/*.ts", buildLocales);
  gulp.watch("./src/sass/JSSelect.scss", gulp.series(buildCSS, postCSS));
}

gulp.task(
  "default",
  gulp.parallel(
    gulp.series(buildJS, miniJS, buildLocales, miniLocales),
    gulp.series(buildCSS, postCSS, miniCSS)
  )
);
gulp.task("dev", gulp.parallel(watch, server));
gulp.task("css", gulp.series(buildCSS, postCSS, miniCSS));
gulp.task("js", gulp.series(buildJS, miniJS, buildLocales, miniLocales));
