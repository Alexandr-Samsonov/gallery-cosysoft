"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var less = require("gulp-less");
var minify = require("gulp-csso");
var run = require("gulp-sequence");
var del = require("del");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "src/css/**",
    "src/img/**",
    "src/js/**",
    "src/*.html"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 10 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("build", run("clean", "copy", "style"));