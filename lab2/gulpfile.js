import { task, src, dest, watch } from "gulp";
import concatenate from "gulp-concat";
import cleanCSS from "gulp-clean-css";
import autoPrefix from "gulp-autoprefixer";
import gulpSASS from "gulp-sass";
import rename from "gulp-rename";

const sassFiles = [
  "./node_modules/tether/dist/css/tether.css",
  "./src/styles/variables.scss",
  "./src/styles/custom.scss"
];

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/tether/dist/js/tether.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

task("sass", () => {
  src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("styles.css"))
    .pipe(dest("./public/css/"))
    .pipe(
      autoPrefix({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("styles.min.css"))
    .pipe(dest("./public/css/"));
});

task("js:vendor", () => {
  src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(dest("./public/js/"));
});

task("build", ["sass", "js:vendor"]);

task("watch", () => {
  watch(sassFiles, ["sass"]);
});

task("default", ["watch"]);
