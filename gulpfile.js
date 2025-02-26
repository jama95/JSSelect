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
const ts = require("gulp-typescript");

function all() {
  return gulp
    .src(["./src/ts/*.ts", "./src/ts/lang/*.ts"])
    .pipe(sourcemaps.init())
    .pipe(
      concat("JSSelect.ts", function (contents, file) {
        let newContents = contents
          .toString()
          .replace(
            /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
            "\n"
          );
        if (!file.path.includes("lang")) {
          newContents = newContents
            .replace(/export /g, "")
            .replace(/default /g, "export default ")
            .replace(/function JSSelect/, "export function JSSelect");
        }
        return (
          `\n//#region ${file.stem}\n` +
          newContents +
          `\n//#endregion ${file.stem}\n`
        )
          .replace(/\n{2,}/, "\n")
          .replace(/\n{2,}/, "\n");
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
}

function types() {
  const tsProject = ts.createProject("tsconfig.json");
  return gulp
    .src("./dist/JSSelect.ts")
    .pipe(tsProject())
    .pipe(
      gulpModifier(function (contents, path) {
        let newContents = contents
          .replace('declare module "all"', 'declare module "JSSelect"')
          .replace(/export const [\s\S]+;/, "");
        return newContents.trim();
      })
    )
    .pipe(gulp.dest("./dist/js"));
}

function buildJS() {
  return gulp
    .src([
      "./src/ts/config.ts",
      "./src/ts/utils.ts",
      "./src/ts/dom.ts",
      "./src/ts/JSSelect.ts",
    ])
    .pipe(
      concat("JSSelect.ts", function (contents, file) {
        let newContents = contents
          .toString()
          .replace(
            /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
            "\n"
          )
          .replace(/export default JSSelect;/, "")
          .replace(/export /g, "")
          .replace(/function JSSelect/, "export function JSSelect");
        return (
          `\n//#region ${file.stem}\n` +
          newContents +
          `\n//#endregion ${file.stem}\n`
        )
          .replace(/\n{2,}/, "\n")
          .replace(/\n{2,}/, "\n");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        plugins: [["@babel/plugin-transform-modules-umd"]],
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
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
}

function buildLocales() {
  return gulp
    .src("./src/ts/lang/*.ts")
    .pipe(
      gulpModifier(function (contents, path) {
        let newContents = contents
          .replace(
            /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
            ""
          )
          .replace(/export /g, "");
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
      "./site/data.json",
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
  "build",
  gulp.parallel(
    gulp.series(all, types, buildJS, miniJS, buildLocales, miniLocales),
    gulp.series(buildCSS, postCSS, miniCSS)
  )
);
gulp.task("dev", gulp.parallel(watch, server));
