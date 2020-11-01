//Variables for all my functions
const { src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const GulpClient = require("gulp");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const babel =  require("gulp-babel");
const rename = require("gulp-rename");

//Search paths
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: "src/images/*",
    scssPath: "src/**/*.scss"
}

//function to Copy HTML and pip it to pub folder
function htmlTask() {
    return src(files.htmlPath)
    .pipe(htmlmin({ removeComments: true }))
    .pipe(dest('pub')
    );
}
//concat and minify JS
function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('pub/js')
    );
}

// Babel- function -> Backwards compiling for JavaScript
function babelTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ["@babel/preset-env"]
      }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream())
}




// Function to transform scss to css
function sassTask () {
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('pub'))
   .pipe(browserSync.stream());
}


//Task for CSS-files
function cssTask() {
    return src(files.cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(sourcemaps.write('/.'))
    .pipe(dest('pub/css')
    );

}

//Function to minify and pipe images
function imgTask() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('pub/images')
    );
}



//Watch task to look for changes in any files
function watchTask() {

    //browser-sync for a live preview function
    browserSync.init({
        injectChanges: false,
        server: {
            baseDir: './pub'
        }
    });
   
    watch([files.htmlPath, files.jsPath, files.imgPath], 
        parallel(htmlTask, babelTask, jsTask, imgTask)).on('change', browserSync.reload);
    watch(files.cssPath, cssTask).on('change', browserSync.reload);    
    watch(files.scssPath, sassTask); 

    
}


//default task
exports.default = series(
    parallel(htmlTask, jsTask, babelTask, imgTask, sassTask),
    cssTask,
    watchTask
);
