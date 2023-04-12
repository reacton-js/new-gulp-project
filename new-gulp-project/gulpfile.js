const gulp = require('gulp')
const webpack = require('webpack-stream')
const pug = require('gulp-pug')
const pugbem = require('gulp-pugbem')
const prettyHtml = require('gulp-pretty-html')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const csscomb = require('gulp-csscomb')
const cleanCSS = require('gulp-clean-css')
const gulpIf = require('gulp-if')
const concat = require('gulp-concat')
const multipipe = require('multipipe')
const browserSync = require('browser-sync').create()
const svgSprite = require('gulp-svg-sprites')
const del = require('gulp-clean')
let mode = 'development'

function pages() {
  return gulp.src('src/pages/*.pug')
    .pipe(pug({ pretty: true, plugins: [pugbem] }))
    .pipe(gulpIf(mode === 'production', prettyHtml({
      indent_size: 2,
      inline: ['b', 'big', 'br', 'em', 'i', 'small', 'span', 'strong', 'sub', 'sup'],
      extra_liners: ['header', 'main', 'nav', 'button', 'footer', 'script', '/body']
    })))
    .pipe(gulp.dest('dist'))
}

function styles() {
  return gulp.src([
    'src/styles/normalize.css',
    'src/styles/helpers.scss',
    'src/styles/style.scss',
    'src/styles/blocks/**/*.scss'
  ])
    .pipe(gulpIf('*.scss', multipipe(
      concat('style.scss'),
      sass.sync(),
      gulpIf(mode === 'production', multipipe(
        autoprefixer(),
        csscomb()
      ))
    )))
    .pipe(concat('style.css'))
    .pipe(gulpIf(mode === 'production', cleanCSS()))
    .pipe(gulp.dest('dist/css'))
}

function scripts() {
  return gulp.src('src/scripts/index.js')
    .pipe(webpack({
      mode,
      output: { filename: 'script.js' },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('dist/js'))
}

function symbols() {
  return gulp.src('src/symbols/**/*.svg')
    .pipe(svgSprite({
      mode: 'symbols',
      preview: false,
      svg: { symbols: 'symbols.svg' }
    }))
    .pipe(gulp.dest('dist/svg'))
}

function serve(done) {
  browserSync.init({
    server: { baseDir: './dist' },
    extensions: ['html'],
    notify: false,
    open: false
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function clean() {
  return gulp.src('dist')
    .pipe(del())
}

function copy() {
  return gulp.src(['src/assets/.*', 'src/assets/**/*.*'])
    .pipe(gulp.dest('dist'))
}

function public(done) {
  mode = 'production'
  done()
}

function watch() {
  gulp.watch('src/pages/**/*.pug', gulp.series(pages, reload))
  gulp.watch('src/styles/**/*.scss', gulp.series(styles, reload))
  gulp.watch('src/scripts/**/*.{mjs,js}', gulp.series(scripts, reload))
  gulp.watch('src/symbols/**/*.svg', gulp.series(symbols, reload))
  gulp.watch('src/assets/**/*', gulp.series(copy, reload))
}

const dev = gulp.series(clean, copy, gulp.parallel(pages, styles, scripts, symbols), serve, watch)
const build = gulp.series(public, dev)

gulp.task('default', dev)
gulp.task('build', build)