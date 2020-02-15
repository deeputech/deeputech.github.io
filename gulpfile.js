"use strict";
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

// Gulp task to minify CSS files
gulp.task("styles", () =>
    gulp
        .src("./_site/assets/css/*.css")
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer())
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest("./_site/assets/css"))
);

// Gulp task to minify JavaScript files
gulp.task("scripts", () =>
    gulp
        .src("./_site/assets/js/*.js")
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest("./_site/assets/js"))
);

// Gulp task to minify HTML files
gulp.task("pages", () =>
    gulp
        .src(["./_site/**/*.html"])
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true
            })
        )
        .pipe(gulp.dest("./_site"))
);

gulp.task("images", () =>
    gulp
        .src(["./assets/images/**/*"])
        .pipe(imagemin())
        .pipe(gulp.dest("./assets/images"))
);

gulp.task("default", gulp.parallel("scripts", "styles", "pages"));
