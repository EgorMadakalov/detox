const {src, dest, watch, parallel, series} = require('gulp');

const scss     = require('gulp-sass')(require('sass'));
const fontfacegen = require('gulp-fontfacegen');
const ttf2woff2 = require('gulp-ttf2woff2');
const concat   = require('gulp-concat');
const uglifyEs = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');


function font() {
    return src("app/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}")
          // Transform your fonts: fonter/ttf2woff2/etc
          .pipe(
              fontfacegen({
                  filepath: "app/css",
                  filename: "fonts.css",
               })
          )
  }

function convFonts(){
    return src('app/font/*.ttf')
      .pipe(ttf2woff2())
      .pipe(dest('app/font/'));
}

function scripts() {
    return src([
        'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglifyEs())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
} 

function styles() {
    return src([
        'app/scss/*.scss',
    ])
        .pipe(autoPrefixer({overrideBrowserslist : ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
}

function browserSyncs(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function watching(){
    watch(['app/scss/*.scss'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload);
}

function cleanDist(){
    return src('dist')
    .pipe(clean())
}

function building(){
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html',
    ], {base : 'app'})
    .pipe(dest('dist'))
}


 
exports.styles = styles;
exports.font = font;
exports.convFonts = convFonts;
exports.scripts = scripts;
exports.watching = watching;
exports.browserSyncs = browserSyncs;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browserSyncs, watching);