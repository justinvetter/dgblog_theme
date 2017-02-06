// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//   `gulp serve`
//   `gulp bower`
//
// *************************************

// Gulp config file
var config = require('./gulp-config');

var getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

// Gulp Vars
var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();

// Non Gulp Plugins
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var beep = require('beepbeep');
var series = require('stream-series');
var fs = require('fs');



var minimist = require('minimist');
var knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);

var productionDest = plugin.if(options.env === 'production', config.dest, config.temp);

var onError = function (err) {
  plugin.notify.onError({
    title: "Gulp error in " + err.plugin,
    message: err.message.toString()
  })(err.message);
  browserSync.notify(err.message, 3000);
  beep(3);
  this.emit('end');
};


// -------------------------------------
//   Task: Build
// -------------------------------------

gulp.task('default', ['clean'], function (done) {
  gulp.start('build')
  done();
})

gulp.task('build', function (callback) {
  runSequence('bower:run', 'bower:fonts', 'bower:images', 'bower:js', 'bower:wiredep', 'bower:scss', 'bower:css', 'bower:concat', 'bower:deltemp', 'fonts', 'scripts', 'styles', 'imagemin', 'svgmin', 'video', 'template:php', 'template:js', 'template:languages', 'template:css', 'template:screenshot', callback)
});



// -------------------------------------
//   Task: serve
// -------------------------------------

gulp.task('serve', ['serve:browsersync'], function () {
  gulp.watch(config.watchSrc + '/index.html', ['html']);
  gulp.watch(config.watchSrc + config.styles + '/**/*.scss', ['styles']);
  gulp.watch(config.watchSrc + config.scripts + '/main.js', ['scripts:watch']);
  gulp.watch(config.watchSrc + config.images + '/**/*.{jpg,jpeg,png,gif}', ['imagemin']);
  gulp.watch(config.watchSrc + config.images + '/**/*.svg', ['svgmin']);
  gulp.watch(config.watchSrc + '/**/*.php', ['php']);

});

gulp.task('serve:browsersync', function () {
  browserSync.init({
      proxy: config.serverProxy
  });
});

// -------------------------------------
//   Task: template
// -------------------------------------

gulp.task('template:php', function() {
  return gulp.src(config.src + '/**/*.php')
    .pipe(gulp.dest(productionDest))
    .pipe(browserSync.stream());
});

gulp.task('template:js', function() {
  return gulp.src(config.src + '/js/**/*')
    .pipe(gulp.dest(productionDest + '/js'))
    .pipe(browserSync.stream());
});

gulp.task('template:languages', function() {
  return gulp.src(config.src + '/languages/**/*')
    .pipe(gulp.dest(productionDest + '/languages'))
    .pipe(browserSync.stream());
});

gulp.task('template:bump', function(){
  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugin.bump({type: 'patch'}))
    .pipe(gulp.dest('./'))
})


gulp.task('template:css', ['template:bump'], function() {
  var pkg = getPackageJson();
  return gulp.src(config.src + '/*.css')
    .pipe(plugin.replace(/{PKG_VERSION}/g, pkg.version))
    .pipe(gulp.dest(productionDest))
    .pipe(browserSync.stream());
});

gulp.task('template:screenshot', function() {
  return gulp.src(config.src + '/screenshot.png')
    .pipe(gulp.dest(productionDest))
    .pipe(browserSync.stream());
});


// -------------------------------------
//   Task: bower
// -------------------------------------

gulp.task('bower', function (done) {
  gulp.start('bower:sequence')
  done();
});

gulp.task('bower:sequence', function (callback) {
  runSequence('bower:run', 'bower:fonts', 'bower:images', 'bower:js', 'bower:wiredep', 'bower:scss', 'bower:css', 'bower:concat', 'bower:deltemp', callback)
})


gulp.task('bower:run', function () {
  return plugin.bower();
});

gulp.task('bower:fonts', function () {
  var fontsFilter = plugin.filter('**/*.{eot,svg,ttf,woff,woff2}', {
    restore: true
  });

  return gulp.src(mainBowerFiles())
    .pipe(fontsFilter)
    .pipe(plugin.flatten())
    .pipe(gulp.dest(productionDest + config.fonts))
    .pipe(browserSync.stream());
});

gulp.task('bower:images', function () {
  var imagesFilter = plugin.filter('**/*.{jpg,jpeg,gif,png}', {
    restore: true
  });
  return gulp.src(mainBowerFiles())
    .pipe(imagesFilter)
    .pipe(plugin.flatten())
    .pipe(plugin.imagemin())
    .pipe(gulp.dest(productionDest + config.images))
    .pipe(browserSync.stream())
})

gulp.task('bower:js', function () {
  var jsFilter = plugin.filter('**/*.js', {
    restore: true
  });

  return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(plugin.concat('vendor.js'))
    .pipe(plugin.if(options.env === 'production', plugin.minify()))
    .pipe(gulp.dest(productionDest + config.scripts))
    .pipe(browserSync.stream());
})

gulp.task('bower:scss', function () {
  return gulp.src(productionDest + config.styles + '/bowerscss.scss')
    .pipe(plugin.sassGlob())
    .pipe(plugin.sass({
      outputStyle: 'nester',
      precision: 10,
      includePaths: ['.']
    }))
    .on('error', function (err) {
      browserSync.notify(err.message, 3000);
      this.emit('end');
    })
    .pipe(plugin.autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(plugin.cssnano({
      safe: true
    }))
    .pipe(gulp.dest(productionDest + config.styles));
});

gulp.task('bower:css', function () {
  var cssFilter = plugin.filter('**/*.css', {
    restore: true
  });

  return gulp.src(mainBowerFiles())
    .pipe(cssFilter)
    .pipe(plugin.concat('bowercss.css'))
    .pipe(gulp.dest(productionDest + config.styles))
    .pipe(cssFilter.restore);
});

gulp.task('bower:concat', function () {
  return gulp.src([productionDest + config.styles + '/bowerscss.css', productionDest + config.styles + '/bowercss.css'])
    .pipe(plugin.concat('vendor.css'))
    .pipe(plugin.cssnano({
      safe: true
    }))
    .pipe(gulp.dest(productionDest + config.styles))
    .pipe(browserSync.stream());
})

gulp.task('bower:wiredep', function () {
  return gulp.src(config.src + config.styles + '/bowerscss.scss')
    .pipe(wiredep())
    .pipe(gulp.dest(productionDest + config.styles))
});

gulp.task('bower:deltemp', function () {
  return gulp.src([productionDest + config.styles + '/bowerscss.scss', productionDest + config.styles + '/bowercss.css', productionDest + config.styles + '/bowerscss.css'])
    .pipe(plugin.clean())
})


// -------------------------------------
//   End bower
// -------------------------------------




gulp.task('fonts', function () {
  return gulp.src(config.src + config.fonts + '/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(plugin.flatten())
    .pipe(gulp.dest(productionDest + config.fonts))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp.src([config.src + config.scripts + '/*.js'])
    .pipe(plugin.concat('main.js'))
    .pipe(gulp.dest(productionDest + config.scripts))
});

gulp.task('scripts:watch', ['scripts'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('styles', function () {
  return gulp.src(config.src + config.styles + '/main.scss')
    .pipe(plugin.plumber({
      errorHandler: onError
    }))
    .pipe(plugin.sassGlob())
    .pipe(plugin.sass({
      outputStyle: 'nester',
      precision: 10,
      includePaths: ['.']
    }))
    .pipe(plugin.autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(plugin.cssnano({
      safe: true
    }))
    .pipe(gulp.dest(productionDest + config.styles))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', function () {
  return gulp.src(config.src + config.images + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(plugin.imagemin())
    .pipe(gulp.dest(productionDest + config.images))
    .pipe(browserSync.stream());
});

gulp.task('svgmin', function () {
  return gulp.src(config.src + config.images + '/**/*.svg')
    .pipe(plugin.svgmin())
    .pipe(gulp.dest(productionDest + config.images))
    .pipe(browserSync.stream());
});

gulp.task('video', function () {
  return gulp.src(config.src + config.video + '/**/*')
    .pipe(gulp.dest(productionDest + config.video));
})



// -------------------------------------
//   Task: clean
// -------------------------------------


gulp.task('clean', function () {
  gulp.src([productionDest + '/assets', productionDest + '/*.php', productionDest + '/inc', productionDest + '/js', productionDest + '/languages', productionDest + '/template-parts', productionDest + '/*.css', productionDest + '/*.png'])
    .pipe(plugin.clean());
});



// -------------------------------------
//   Task: html
// -------------------------------------

gulp.task('html', function (done) {
  gulp.start('html:sequence');
  done();
});

gulp.task('html:sequence', function (callback) {
  runSequence('html:copy', 'html:inject', callback)
})

gulp.task('html:copy', function () {
  return gulp.src(config.src + '/index.html')
    .pipe(gulp.dest(productionDest))
})

gulp.task('html:inject', function () {
  var target = gulp.src(productionDest + '/*.html');
  var sources = gulp.src([productionDest + config.scripts + '/main.js', productionDest + config.styles + '/main.css'], {
    read: false
  });
  var vendorSources = gulp.src([productionDest + config.scripts + '/vendor.js', productionDest + config.styles + '/vendor.css'], {
    read: false
  });

  return target.pipe(plugin.inject(series(vendorSources, sources), {
    relative: true
  }))

    .pipe(plugin.if(options.env === 'production', plugin.injectString.after('<!-- injectgtm:head -->', "<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + config.gtm + "');</script><!-- End Google Tag Manager -->")))
    .pipe(plugin.if(options.env === 'production', plugin.injectString.after('<!-- injectgtm:body -->', '<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' + config.gtm + '"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->')))
    .pipe(plugin.if(options.env === 'production', plugin.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code)))
    .pipe(plugin.if(options.env === 'production', plugin.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      conservativeCollapse: true
    })))
    .pipe(gulp.dest(productionDest))
    .pipe(browserSync.stream());
});






// -------------------------------------
//   Task: favicon
// -------------------------------------


// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
  plugin.realFavicon.generateFavicon({
    masterPicture: config.src + '/favicon.png',
    dest: config.dest,
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        },
        appName: 'DigitalGlobe welcomes The Radiant Group!'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        },
        appName: 'DigitalGlobe welcomes The Radiant Group!'
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: 'DigitalGlobe welcomes The Radiant Group!',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 79.6875,
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
});