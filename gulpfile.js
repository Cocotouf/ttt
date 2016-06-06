'use strict'; 
/*=====================================
=        Default Configuration        =
=====================================*/
var isWin = /^win/.test(process.platform);

var gulpConfig = {
  dest: 'www',
  paths : {
    sass : {
      vendor : [
        './bower_components/font-awesome/scss/font-awesome.scss'
      ],
      src : [
        'src/scss/ttt-app.scss'           
      ]
    },
    js: {
      vendor: [
        './bower_components/angular/angular.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/angular-aria/angular-aria.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-material/angular-material.js'
      ],
      src: [
        './src/js/**/*.js'
      ],
      templates: [
        './src/js/**/*.html'
      ]
    },
    fonts: {
      vendor: [
        './bower_components/font-awesome/fonts/fontawesome-webfont.*'
	    ],
    },
    images: [
      './src/img/**/*'
    ]
  },

  server: {
    host: '0.0.0.0',
    port: '80',
    livereload: true,
    livereloadPort: 35729
  },
  localExec: isWin,
  watch: true
};
/*-----  End of Configuration  ------*/

/*========================================
=            Requiring stuffs            =
========================================*/

var gulp = require('gulp');

var runSequence       = require('run-sequence'),
    connect           = require('gulp-connect'),
    sass              = require('gulp-sass'),
//    uglify            = require('gulp-uglify'),
    sourcemaps        = require('gulp-sourcemaps'),
    cssmin            = require('gulp-cssmin'),
    concat            = require('gulp-concat'),
    rimraf            = require('gulp-rimraf'),
    templateCache     = require('gulp-angular-templatecache'),
    replace           = require('gulp-replace'),
    ngFilesort        = require('gulp-angular-filesort'),
    streamqueue       = require('streamqueue'),
    rename            = require('gulp-rename'),
    path              = require('path');

gulp.task('default', [ 'run' ]);

/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function(e) {
  throw e;
});

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function clean() {
  return gulp.src([
        path.join(gulpConfig.dest, 'index.html'),
        path.join(gulpConfig.dest, 'images'),
        path.join(gulpConfig.dest, 'css'),
        path.join(gulpConfig.dest, 'js'),
        path.join(gulpConfig.dest, 'fonts')
      ], { read: false })
     .pipe(rimraf());
});


/*==========================================
=            Start a web server            =
==========================================*/

gulp.task('server:app', function serverApp() {
  connect.server({
    root: gulpConfig.dest,
    host: gulpConfig.server.host,
    port: gulpConfig.server.port,
    livereload: gulpConfig.server.livereload,
    fallback: 'www/index.html'
  });
});


/*=====================================
=            Copy Images              =
=====================================*/

gulp.task('build:images', function buildImages() {
  var stream = gulp.src(gulpConfig.paths.images);
  return stream.pipe(gulp.dest(path.join(gulpConfig.dest, 'img')));
});

/*==================================
=            Copy fonts            =
==================================*/

gulp.task('build:fonts', function buildFonts() {
  return gulp.src(gulpConfig.paths.fonts.vendor)
  .pipe(gulp.dest(path.join(gulpConfig.dest, 'fonts')));
});


/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('build:html', function buildHtml(done) {
  var inject = [];
  if (gulpConfig.server.livereload) {
    inject.push('<script src="http://' + 'localhost' +
        ':35729/livereload.js"></script>');
  }
  
  var p = gulp.src(['src/html/**/*.html'])
  .pipe(replace('<!-- inject:js -->', inject.join('\n    ')))
  .pipe(gulp.dest(gulpConfig.dest));
  
  if (gulpConfig.server.livereload) {
    p.pipe(connect.reload());
  }
  
  p.on('end', done);
});

/*
 * ========================================= 
 *      = Compile Sass =
 * =========================================
 */
gulp.task('build:sass', ['_sass-vendor', '_sass-app']);

gulp.task('_sass-vendor', function sassVendors(done) {
  var p = gulp.src(gulpConfig.paths.sass.vendor)
    .pipe(sass({errLogToConsole : true}))
//    .pipe(cssmin())
    .pipe(rename({extname : '.min.css'}))
    .pipe(gulp.dest('./www/css/'));
  

  if (gulpConfig.server.livereload) {
    p.pipe(connect.reload());
  }
  
  p.on('end', done);
});

gulp.task('_sass-app', function sassApp(done) {
  var p = gulp.src(gulpConfig.paths.sass.src)
    .pipe(sass({errLogToConsole : true}))
//    .pipe(cssmin())
    .pipe(rename({extname : '.min.css'}))
    .pipe(gulp.dest('./www/css/'));
  
  if (gulpConfig.server.livereload) {
    p.pipe(connect.reload());
  }
  
  p.on('end', done);
});

/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/
// - Orders ng deps automatically
// - Precompile templates to ng templateCache
gulp.task('build:js', function buildJs(done) {

  var stream = streamqueue({ objectMode: true });
  
  stream.queue(gulp.src(gulpConfig.paths.js.vendor));
  stream.queue(gulp.src(gulpConfig.paths.js.src).pipe(ngFilesort({reportErrors: false})));
  stream.queue(gulp.src(gulpConfig.paths.js.templates).pipe(templateCache({ module: 'ttt' })));
  
  var pipe = stream.done()
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'));
  
   // pipe.pipe(uglify())
  pipe.pipe(rename({suffix: '.min'}))
  pipe.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(gulpConfig.dest, 'js')));

  if (gulpConfig.server.livereload) {
    pipe.pipe(connect.reload());
  }
  
  pipe.on('end', done);
});


/*
 * ========================================= 
 * Watchers
 * =========================================
 */
gulp.task('_watch-sass-app', function watchSassApp() {
  gulp.watch('./src/scss/**/*.*css', function (events) {
    gulp.start('_sass-app');
  });
});

gulp.task('_watch-html', function watchHtml() {
  gulp.watch('./src/html/**/*.html', function (events) {
    gulp.start('build:html');
  });
});

gulp.task('_watch-js', function watchJS() {
  gulp.watch([gulpConfig.paths.js.src, gulpConfig.paths.js.templates], function (events) {
    gulp.start('build:js');
  });
});


/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function build(done) {
  var tasks = ['build:html',
               'build:fonts',
               'build:images',
               'build:sass',
               'build:js'];
  runSequence('clean', tasks, done);
});


/*====================================
=            Run Task            =
====================================*/

gulp.task('run', function run(done) {
  var tasks = [];
  if (gulpConfig.watch) {
    tasks = [
       '_watch-sass-app', 
       '_watch-html',
       '_watch-js'
    ];
  }
  tasks.push('server:app');
  
  runSequence('build', tasks, done);
});
