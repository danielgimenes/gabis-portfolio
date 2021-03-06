var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var htmlImport = require('gulp-html-import');
var del = require('del');
const { src } = require('gulp');

var paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'build/'
  },
  components: {
    src: './src/components/',
  },
  docs: {
    src: 'src/doc/**/*.pdf',
    dest: 'build/doc/'
  },
  styles: {
    src: 'src/styles/**/*.{less,css}',
    dest: 'build/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/scripts/'
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'build/img/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'build' ]);
}

/*
 * Define our tasks using plain functions
 */
function html() {
    return gulp.src(paths.html.src)
      .pipe(htmlImport(paths.components.src))
      .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
      .pipe(gulp.dest(paths.html.dest));
}

function docs() {
  return gulp.src(paths.docs.src)
    .pipe(gulp.dest(paths.docs.dest));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(concat('main.less'))
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main2',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat('main2.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp.src(paths.images.src, {since: gulp.lastRun(images)})
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.components.src, html);
  gulp.watch(paths.docs.src, docs);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(html, docs, styles, scripts, images));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.html = html;
exports.docs = docs;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
