
/*
* Dependencias
*/
var gulp        = require('gulp');
var gulpFilter  = require('gulp-filter')
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var ts          = require('gulp-typescript');
var mainBowerFiles = require('gulp-main-bower-files');
var bourbon     = require('node-bourbon');
bourbon.with('app/styles/')

var sourcemaps  = require('gulp-sourcemaps');
var rename      = require('gulp-rename');
var debug       = require('gulp-debug');

var connect = require('gulp-connect');

var path = {
    scripts : {
        src     : 'app/scripts/*.ts',
        concat  : 'main.js',
        dest    : 'js/',
    },
    styles  : {
        src     : 'app/styles/**/*.scss',
        dest    : 'css/',
    },
    views   : {
        src     : 'app/views/**/*.jade',
        dest    : ''
    },
};

gulp.task('webserver', function() {
    // var gulpFilter = require('gulp-filter')
    connect.server({
        livereload: true
    });
});
 

gulp.task('main-bower-files', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(uglify())
        .pipe(concat('vendor.js')) //aqui se juntan todos los scripts
        .pipe(gulp.dest('js/'));
});


/*
* Configuración de la tarea 'scripts'
*/
gulp.task('scripts', function () {
    return gulp.src('app/scripts/*.ts') //archivos a concatenar
        
        // .pipe(concat('main.js')) //aqui se juntan todos los scripts
        // .pipe(uglify())
        // .pipe(sourcemaps.write('js/'))
        // .pipe(debug({verbose: true}))
        .pipe(sourcemaps.init())
        .pipe(ts({
			noImplicitAny: true,
			out: 'main.js'
		}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js/'))
        .pipe(connect.reload());
});

/*
* Configuración de la tarea 'sass'
*/
gulp.task('styles', function () {
    var filter = gulpFilter(['*', '_*.*']);
    return gulp.src(path.styles.src)
        .pipe(filter)
        .pipe(sourcemaps.init())
        .pipe(sass({ 
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.styles.dest))
        .pipe(connect.reload());
});

/*
* Configuración de la tarea 'html'
*/
gulp.task('views', function() {
    var filter = gulpFilter(['*', '_*.*']);
    return gulp.src(path.views.src)
    .pipe(jade({
        pretty: true
    }))
    .pipe(filter)
    .pipe(gulp.dest(path.views.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function () {

    gulp.watch(path.views.src, ['views']);
    gulp.watch(path.styles.src, ['styles']);
    gulp.watch(path.scripts.src, ['scripts']);
});





gulp.task('default', ['main-bower-files', 'scripts', 'styles', 'views', 'webserver', 'watch']);
