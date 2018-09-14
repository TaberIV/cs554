const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = ["./src/styles/*"];

const js = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

gulp.task("sass", done => {
  gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("main.css"))
    .pipe(gulp.dest("./public/css/"))
    .pipe(
      autoPrefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("./public/css/"));
  done();
});

gulp.task("js", done => {
  gulp.src(js).pipe(gulp.dest("public/js"));
  done();
});

gulp.task("build", ["sass", "js"]);

gulp.task("watch", done => {
  gulp.watch(sassFiles, ["sass"]);
  done();
});

gulp.task("default", ["watch"]);
