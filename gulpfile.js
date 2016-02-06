var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('build:server', function() {
    var tsProject = ts.createProject('server/tsconfig.json');
    var tsResult = gulp.src('server/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(concat('server.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

var jsNPMDependencies = [
    'bootstrap/dist/css/bootstrap.css',
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js'
];

gulp.task('build:index', function() {
    var mappedPaths = jsNPMDependencies.map(file => {
        return path.resolve('node_modules', file);
    });
    var copyJsNPMDependencies = gulp.src(mappedPaths, {
            base: 'node_modules'
        })
        .pipe(gulp.dest('dist/libs')); 
    var copyIndex = gulp.src('client/index.html')
        .pipe(gulp.dest('dist'));
    return [copyJsNPMDependencies, copyIndex];
});

gulp.task('build:app', function() {
    var tsProject = ts.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});


gulp.task('build', function(callback) {
    runSequence('clean', 'build:server', 'build:index', 'build:app', callback);
});

gulp.task('serve', function (cb) {
    nodemon({
        script  : 'dist/server.js',
        watch   : 'dist/'		
        //...add nodeArgs: ['--debug=5858'] to debug 
        //..or nodeArgs: ['--debug-brk=5858'] to debug at server start
    }).on('start', function () {
        setTimeout(function () {
            livereload.changed();
        }, 2000); 
    });
});

gulp.task('server', function(callback) {
    runSequence('build', 'serve', callback);
});

gulp.task('default', ['build']);
